terraform {
  required_version = ">= 1.0"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

variable "project_id" {
  description = "GCP project ID"
  type        = string
  default     = "inplico-building-codes"
}

variable "region" {
  description = "GCP region"
  type        = string
  default     = "us-central1"
}

# DNS Zone for athynainsight.ai
resource "google_dns_managed_zone" "athyna_zone" {
  name        = "athyna-insight-zone"
  dns_name    = "athynainsight.ai."
  description = "DNS zone for athynainsight.ai website"
  
  dnssec_config {
    state = "on"
  }

  labels = {
    environment = "production"
    managed-by  = "terraform"
    project     = "athyna-website"
  }
}

# Reserve a global IP address for the website
resource "google_compute_global_address" "athyna_website_ip" {
  name = "athyna-website-ip"
}

# SSL certificate for HTTPS
resource "google_compute_managed_ssl_certificate" "athyna_website_cert" {
  name = "athyna-website-cert"
  
  managed {
    domains = ["athynainsight.ai", "www.athynainsight.ai"]
  }
}

# Network Endpoint Group for Cloud Run service
resource "google_compute_region_network_endpoint_group" "athyna_website_neg" {
  name                  = "athyna-website-neg"
  network_endpoint_type = "SERVERLESS"
  region                = var.region
  
  cloud_run {
    service = "athyna-website"
  }
}

# Backend service for the load balancer
resource "google_compute_backend_service" "athyna_website_backend" {
  name                  = "athyna-website-backend"
  protocol              = "HTTPS"
  load_balancing_scheme = "EXTERNAL_MANAGED"
  
  backend {
    group = google_compute_region_network_endpoint_group.athyna_website_neg.id
  }
}

# URL map for routing
resource "google_compute_url_map" "athyna_website_url_map" {
  name            = "athyna-website-url-map"
  default_service = google_compute_backend_service.athyna_website_backend.id
}

# HTTPS target proxy
resource "google_compute_target_https_proxy" "athyna_website_https_proxy" {
  name             = "athyna-website-https-proxy"
  url_map          = google_compute_url_map.athyna_website_url_map.id
  ssl_certificates = [google_compute_managed_ssl_certificate.athyna_website_cert.id]
}

# Global forwarding rule (Load Balancer)
resource "google_compute_global_forwarding_rule" "athyna_website_forwarding_rule" {
  name                  = "athyna-website-forwarding-rule"
  ip_protocol           = "TCP"
  load_balancing_scheme = "EXTERNAL_MANAGED"
  port_range            = "443"
  target                = google_compute_target_https_proxy.athyna_website_https_proxy.id
  ip_address            = google_compute_global_address.athyna_website_ip.id
}

# HTTP to HTTPS redirect
resource "google_compute_url_map" "athyna_website_http_redirect" {
  name = "athyna-website-http-redirect"
  
  default_url_redirect {
    https_redirect         = true
    strip_query            = false
    redirect_response_code = "MOVED_PERMANENTLY_DEFAULT"
  }
}

resource "google_compute_target_http_proxy" "athyna_website_http_proxy" {
  name    = "athyna-website-http-proxy"
  url_map = google_compute_url_map.athyna_website_http_redirect.id
}

resource "google_compute_global_forwarding_rule" "athyna_website_http_forwarding_rule" {
  name                  = "athyna-website-http-forwarding-rule"
  ip_protocol           = "TCP"
  load_balancing_scheme = "EXTERNAL_MANAGED"
  port_range            = "80"
  target                = google_compute_target_http_proxy.athyna_website_http_proxy.id
  ip_address            = google_compute_global_address.athyna_website_ip.id
}

# DNS Records
resource "google_dns_record_set" "athyna_root" {
  name         = google_dns_managed_zone.athyna_zone.dns_name
  type         = "A"
  ttl          = 300
  managed_zone = google_dns_managed_zone.athyna_zone.name
  rrdatas      = [google_compute_global_address.athyna_website_ip.address]
}

resource "google_dns_record_set" "athyna_www" {
  name         = "www.${google_dns_managed_zone.athyna_zone.dns_name}"
  type         = "CNAME"
  ttl          = 300
  managed_zone = google_dns_managed_zone.athyna_zone.name
  rrdatas      = [google_dns_managed_zone.athyna_zone.dns_name]
}

# Loops Email DNS Records
# MX Record for email delivery
resource "google_dns_record_set" "loops_mx" {
  name         = "envelope.${google_dns_managed_zone.athyna_zone.dns_name}"
  type         = "MX"
  ttl          = 300
  managed_zone = google_dns_managed_zone.athyna_zone.name
  rrdatas      = ["10 feedback-smtp.us-east-1.amazonses.com."]
}

# SPF Record for email routing and error reporting
resource "google_dns_record_set" "loops_spf" {
  name         = "envelope.${google_dns_managed_zone.athyna_zone.dns_name}"
  type         = "TXT"
  ttl          = 300
  managed_zone = google_dns_managed_zone.athyna_zone.name
  rrdatas      = ["\"v=spf1 include:amazonses.com ~all\""]
}

# DKIM Records for signing emails
resource "google_dns_record_set" "loops_dkim_1" {
  name         = "6tdijfjo5tgbutf44z62v7illxtwwyw5._domainkey.${google_dns_managed_zone.athyna_zone.dns_name}"
  type         = "CNAME"
  ttl          = 300
  managed_zone = google_dns_managed_zone.athyna_zone.name
  rrdatas      = ["6tdijfjo5tgbutf44z62v7illxtwwyw5.dkim.amazonses.com."]
}

resource "google_dns_record_set" "loops_dkim_2" {
  name         = "um4sxmxoqyrxynqk3jpivt7kfxhedkbr._domainkey.${google_dns_managed_zone.athyna_zone.dns_name}"
  type         = "CNAME"
  ttl          = 300
  managed_zone = google_dns_managed_zone.athyna_zone.name
  rrdatas      = ["um4sxmxoqyrxynqk3jpivt7kfxhedkbr.dkim.amazonses.com."]
}

resource "google_dns_record_set" "loops_dkim_3" {
  name         = "lqaeeang4kekzexup36s5wnr6q2wp7p7._domainkey.${google_dns_managed_zone.athyna_zone.dns_name}"
  type         = "CNAME"
  ttl          = 300
  managed_zone = google_dns_managed_zone.athyna_zone.name
  rrdatas      = ["lqaeeang4kekzexup36s5wnr6q2wp7p7.dkim.amazonses.com."]
}

# Outputs
output "athyna_nameservers" {
  value       = google_dns_managed_zone.athyna_zone.name_servers
  description = "Configure these nameservers at your domain registrar for athynainsight.ai"
}

output "athyna_website_ip" {
  value       = google_compute_global_address.athyna_website_ip.address
  description = "The IP address of the athyna website load balancer"
}

output "athyna_website_dns_instructions" {
  value = <<EOF
To complete DNS setup for athynainsight.ai:

1. Go to your domain registrar (GoDaddy/Namecheap)
2. Update nameservers to:
${join("\n", google_dns_managed_zone.athyna_zone.name_servers)}

3. DNS propagation may take up to 48 hours
EOF
  description = "Instructions for DNS configuration"
}