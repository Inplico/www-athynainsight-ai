# Reusable Cloud Run Job module for Athyna Insight

terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0"
    }
  }
}

# Service account for job
resource "google_service_account" "sa" {
  account_id   = "${var.name}-sa"
  display_name = "Service Account for ${var.name}"
  project      = var.project_id
}

# IAM bindings for job service account
resource "google_project_iam_member" "sa_logging" {
  project = var.project_id
  role    = "roles/logging.logWriter"
  member  = "serviceAccount:${google_service_account.sa.email}"
}

resource "google_project_iam_member" "sa_run_invoker" {
  project = var.project_id
  role    = "roles/run.invoker"
  member  = "serviceAccount:${google_service_account.sa.email}"
}

# Build and push Docker image
resource "docker_image" "job_image" {
  name = "${var.name}:latest"
  build {
    context = var.docker_context
    dockerfile = "Dockerfile"
    platform = "linux/amd64"
  }
  
  # Rebuild when files in the context directory change
  triggers = {
    dir_sha1 = sha1(join("", [
      for f in fileset(var.docker_context, "**") : filesha1("${var.docker_context}/${f}")
    ]))
  }
  
  # Tag the image with the GCR path
  provisioner "local-exec" {
    command = "docker tag ${self.name} ${var.region}-docker.pkg.dev/${var.project_id}/${var.artifact_registry_id}/${var.name}:latest"
  }

  # Push the image to GCR
  provisioner "local-exec" {
    command = "docker push ${var.region}-docker.pkg.dev/${var.project_id}/${var.artifact_registry_id}/${var.name}:latest"
  }
}

# Cloud Run Job resource
resource "google_cloud_run_v2_job" "job" {
  name     = "${var.name}-job"
  location = var.region
  
  labels = var.labels
  
  template {
    task_count = 1  # Single task job

    template {
      containers {
        image = "${var.region}-docker.pkg.dev/${var.project_id}/${var.artifact_registry_id}/${var.name}:latest"
        
        dynamic "env" {
          for_each = var.environment_variables
          
          content {
            name  = env.key
            value = env.value
          }
        }
        
        resources {
          limits = var.resource_limits
        }
      }

      max_retries = var.max_retries
      timeout = var.timeout
      
      # Service account with necessary permissions
      service_account = google_service_account.sa.email
      
      # Execution environment
      execution_environment = var.execution_environment
    }
  }
  
  lifecycle {
    create_before_destroy = true
    ignore_changes = [
      template[0].template[0].containers[0].image
    ]
  }
  
  # Dependencies for the Cloud Run Job
  depends_on = [
    docker_image.job_image
  ]
}