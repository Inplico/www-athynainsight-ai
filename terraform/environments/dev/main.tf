# Development environment configuration
# This inherits from the main terraform configuration with dev-specific overrides

terraform {
  required_version = ">= 1.0"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }

  # TODO: Uncomment when ready for remote state management
  # backend "gcs" {
  #   bucket = "inplico-terraform-state"
  #   prefix = "terraform/state/dev"
  # }
}

# Use the main terraform configuration
module "infrastructure" {
  source = "../../"

  # Environment-specific overrides
  project_id  = var.project_id
  region      = var.region
  environment = "dev"
  owner_email = var.owner_email

  # Development-specific configuration
  cloud_run_config = {
    cpu                   = "1000m"
    memory                = "512Mi"
    max_instances         = 2 # Lower for dev
    min_instances         = 0
    container_concurrency = 50
    timeout_seconds       = 300
  }

  storage_config = {
    storage_class      = "STANDARD"
    versioning_enabled = true
    nearline_age_days  = 30 # Shorter for dev
    archive_age_days   = 90 # Shorter for dev
  }
} 