# Simplified variables for Athyna Insight AI website deployment

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

variable "notification_emails" {
  description = "List of email addresses to receive monitoring alerts"
  type        = list(string)
  default     = ["admin@athynainsight.ai"]
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
    max_instances         = 10
    min_instances         = 0
    container_concurrency = 100
    timeout_seconds       = 300
  }
}