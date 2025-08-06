variable "project_id" {
  description = "The GCP project ID"
  type        = string
  default     = "athyna-insight-ai"
}

variable "region" {
  description = "The GCP region for resources"
  type        = string
  default     = "us-central1"
}

variable "environment" {
  description = "Environment name (dev, staging, prod)"
  type        = string
  default     = "dev"

  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "Environment must be dev, staging, or prod."
  }
}

variable "gemini_api_key" {
  description = "API key for Google's Gemini API"
  type        = string
  sensitive   = true
}

variable "geocoding_api_key" {
  description = "API key for Google's Geocoding API"
  type        = string
  sensitive   = true
}

variable "langsmith_api_key" {
  description = "API key for LangSmith API"
  type        = string
  sensitive   = true
}

variable "owner_email" {
  description = "Email of the project owner for BigQuery access"
  type        = string
  # Set this in terraform.tfvars or pass as -var
}

variable "developer_email" {
  description = "Email of the developer (Aniket) for IAM access"
  type        = string
  default     = "aniketsharma00411@gmail.com"
}

variable "notification_emails" {
  description = "List of email addresses to receive monitoring alerts"
  type        = list(string)
  default     = ["admin@athynainsight.ai", "alerts@athynainsight.ai"]
}

# Cloud Run Configuration
variable "cloud_run_config" {
  description = "Configuration for Cloud Run service"
  type = object({
    cpu                   = string
    memory                = string
    max_instances         = number
    min_instances         = number
    container_concurrency = number
    timeout_seconds       = number
  })
  default = {
    cpu                   = "1000m"
    memory                = "512Mi"
    max_instances         = 5
    min_instances         = 0
    container_concurrency = 100
    timeout_seconds       = 300
  }
}

# Storage Configuration
variable "storage_config" {
  description = "Configuration for Cloud Storage"
  type = object({
    storage_class      = string
    versioning_enabled = bool
    nearline_age_days  = number
    archive_age_days   = number
  })
  default = {
    storage_class      = "STANDARD"
    versioning_enabled = true
    nearline_age_days  = 90
    archive_age_days   = 365
  }
}

# BigQuery Configuration
variable "bigquery_config" {
  description = "Configuration for BigQuery dataset"
  type = object({
    delete_contents_on_destroy  = bool
    default_table_expiration_ms = number
  })
  default = {
    delete_contents_on_destroy  = false
    default_table_expiration_ms = null
  }
}

# Google OAuth Configuration
variable "google_oauth_client_id" {
  description = "Google OAuth client ID for SSO"
  type        = string
  sensitive   = true
}

variable "google_oauth_client_secret" {
  description = "Google OAuth client secret for SSO"
  type        = string
  sensitive   = true
}

# Firebase Authentication Configuration
variable "authorized_domains" {
  description = "List of domains authorized for OAuth redirects"
  type        = list(string)
  default     = ["localhost", "athyna-insight-ai.us-central1.run.app"] # Remove localhost when out of MVP stage and have a separate staging infrastructure
}
