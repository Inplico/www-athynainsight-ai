# Reusable Cloud Function module for Athyna Insight

terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
}

# Create a storage bucket for function source code
resource "google_storage_bucket" "function_source" {
  name          = "${var.project_id}-function-source-${var.function_name}"
  location      = var.region
  storage_class = "STANDARD"

  labels = var.labels

  versioning {
    enabled = true
  }

  lifecycle_rule {
    condition {
      age = 30
    }
    action {
      type = "Delete"
    }
  }

  force_destroy = true  # Allow deletion of non-empty bucket
}

# Upload function source code
resource "google_storage_bucket_object" "function_zip" {
  name   = "${var.function_name}-${var.source_hash}.zip"
  bucket = google_storage_bucket.function_source.name
  source = var.source_zip_path
}

# Cloud Function
resource "google_cloudfunctions2_function" "function" {
  name        = var.function_name
  location    = var.region
  description = var.description
  
  build_config {
    runtime     = var.runtime
    entry_point = var.entry_point
    source {
      storage_source {
        bucket = google_storage_bucket.function_source.name
        object = google_storage_bucket_object.function_zip.name
      }
    }
  }
  
  service_config {
    available_memory      = "${var.memory_mb}M"
    timeout_seconds       = var.timeout_seconds
    service_account_email = var.service_account_email
    environment_variables = var.environment_variables
  }
}

# IAM binding for HTTP triggers
resource "google_cloud_run_service_iam_member" "invoker" {
  count    = var.trigger_type == "http" && var.allow_public_access ? 1 : 0

  project  = var.project_id
  location = var.region
  service  = google_cloudfunctions2_function.function.name

  role     = "roles/run.invoker"
  member   = "allUsers"
}