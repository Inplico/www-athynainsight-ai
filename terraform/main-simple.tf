# Simplified Terraform configuration for Athyna Insight AI website
# Basic Cloud Run deployment with minimal dependencies

terraform {
  required_version = ">= 1.0"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
}

# Configure the Google Cloud Provider
provider "google" {
  project = var.project_id
  region  = var.region
}

# Get current GCP project config
data "google_client_config" "provider" {}

# Get project information to access the project number
data "google_project" "project" {
  project_id = var.project_id
}

# Local values for common configurations
locals {
  labels = {
    project     = "athyna-insight-ai"
    environment = var.environment
    managed-by  = "terraform"
  }
}

# Enable required APIs for basic website deployment
resource "google_project_service" "required_apis" {
  for_each = toset([
    "run.googleapis.com",
    "artifactregistry.googleapis.com",
    "logging.googleapis.com",
    "monitoring.googleapis.com",
  ])

  project = var.project_id
  service = each.value

  disable_dependent_services = false
  disable_on_destroy         = false
}

# Artifact Registry for container images
resource "google_artifact_registry_repository" "container_repo" {
  repository_id = "www-athynainsight-ai"
  location      = var.region
  format        = "DOCKER"
  description   = "Container repository for Athyna Insight AI website"

  labels = local.labels

  depends_on = [google_project_service.required_apis]
}

# Basic monitoring alert for website downtime (optional)
resource "google_monitoring_notification_channel" "email" {
  for_each = toset(var.notification_emails)

  display_name = "Email Notifications - ${each.value}"
  type         = "email"

  labels = {
    email_address = each.value
  }

  force_delete = true

  depends_on = [google_project_service.required_apis]

  lifecycle {
    create_before_destroy = true
  }
}