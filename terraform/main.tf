# Terraform configuration for Inplico Building Code POC
# This manages all infrastructure as code

terraform {
  required_version = ">= 1.0"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "~> 5.0"
    }
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0"
    }
  }

  # TODO: Set up remote state when ready for production
  # backend "gcs" {
  #   bucket = "inplico-terraform-state"
  #   prefix = "terraform/state"
  # }
}

# Configure the Google Cloud Provider
provider "google" {
  project = var.project_id
  region  = var.region
  # Need to explicitly set billing project for identity toolkit and Firebase
  # This is required for Firebase and Identity Toolkit APIs
  user_project_override = true
  billing_project       = var.project_id
}

provider "google-beta" {
  project = var.project_id
  region  = var.region
  # Need to explicitly set billing project for identity toolkit and Firebase
  # This is required for Firebase and Identity Toolkit APIs
  user_project_override = true
  billing_project       = var.project_id
}

# Get current GCP project config
data "google_client_config" "provider" {}

# Get project information to access the project number
data "google_project" "project" {
  project_id = var.project_id
}

# Configure Docker provider for Artifact Registry
provider "docker" {
  registry_auth {
    address  = "${var.region}-docker.pkg.dev"
    username = "oauth2accesstoken"
    password = data.google_client_config.provider.access_token
  }
}

# Local values for common configurations
locals {
  labels = {
    project     = "inplico-building-codes"
    environment = var.environment
    managed-by  = "terraform"
    team        = "inplico"
  }
}

# Enable required APIs
resource "google_project_service" "required_apis" {
  for_each = toset([
    "run.googleapis.com",
    "artifactregistry.googleapis.com",
    "storage.googleapis.com",
    "bigquery.googleapis.com",
    "documentai.googleapis.com",
    "aiplatform.googleapis.com",
    "cloudfunctions.googleapis.com",
    "sqladmin.googleapis.com",
    "secretmanager.googleapis.com",
    "logging.googleapis.com",
    "monitoring.googleapis.com",
    "clouderrorreporting.googleapis.com",
    "geocoding-backend.googleapis.com",
    "firebase.googleapis.com",
    "identitytoolkit.googleapis.com",
    "firestore.googleapis.com",
    "firebaserules.googleapis.com"
  ])

  project = var.project_id
  service = each.value

  disable_dependent_services = false
  disable_on_destroy         = false
}

# Artifact Registry for container images
resource "google_artifact_registry_repository" "container_repo" {
  repository_id = "athyna-insight-ai"
  location      = var.region
  format        = "DOCKER"
  description   = "Container repository for Athyna Insight AI Website"

  labels = local.labels

  depends_on = [google_project_service.required_apis]
}

# Cloud Storage bucket for documents
resource "google_storage_bucket" "documents" {
  name          = "${var.project_id}-documents"
  location      = var.region
  storage_class = "STANDARD"

  labels = local.labels

  versioning {
    enabled = true
  }

  lifecycle_rule {
    condition {
      age = 90
    }
    action {
      type          = "SetStorageClass"
      storage_class = "NEARLINE"
    }
  }

  lifecycle_rule {
    condition {
      age = 365
    }
    action {
      type          = "SetStorageClass"
      storage_class = "ARCHIVE"
    }
  }

  depends_on = [google_project_service.required_apis]
}

# Create folder structure in the bucket
resource "google_storage_bucket_object" "folders" {
  for_each = toset([
    "raw-documents/",
    "processed/",
    "embeddings/"
  ])

  name    = each.value
  bucket  = google_storage_bucket.documents.name
  content = " "
}

# Upload the building code PDF to the raw-documents folder
resource "google_storage_bucket_object" "building_code_pdf" {
  name   = "raw-documents/2023NBCAE-V1_National_Building_Code2023_Alberta_Edition_DivisionB_Part9.pdf"
  bucket = google_storage_bucket.documents.name
  source = "${path.module}/../bucket_documents/2023NBCAE-V1_National_Building_Code2023_Alberta_Edition_DivisionB_Part9.pdf"

  # This ensures the file is re-uploaded if it changes
  detect_md5hash = filemd5("${path.module}/../bucket_documents/2023NBCAE-V1_National_Building_Code2023_Alberta_Edition_DivisionB_Part9.pdf")
}

# BigQuery dataset for vector search and analytics
resource "google_bigquery_dataset" "main" {
  dataset_id  = "inplico_building_codes"
  location    = var.region
  description = "Dataset for building code vector search and analytics"

  labels = local.labels

  access {
    role          = "OWNER"
    user_by_email = var.owner_email
  }

  access {
    role          = "OWNER"
    user_by_email = var.developer_email
  }

  depends_on = [google_project_service.required_apis]
}

# IAM roles for developer (Aniket) to manage service accounts and resources
resource "google_project_iam_member" "developer_service_account_admin" {
  project = var.project_id
  role    = "roles/iam.serviceAccountAdmin"
  member  = "user:${var.developer_email}"
}

resource "google_project_iam_member" "developer_service_account_user" {
  project = var.project_id
  role    = "roles/iam.serviceAccountUser"
  member  = "user:${var.developer_email}"
}

resource "google_project_iam_member" "developer_security_admin" {
  project = var.project_id
  role    = "roles/iam.securityAdmin"
  member  = "user:${var.developer_email}"
}

resource "google_project_iam_member" "developer_storage_admin" {
  project = var.project_id
  role    = "roles/storage.admin"
  member  = "user:${var.developer_email}"
}

resource "google_project_iam_member" "developer_bigquery_admin" {
  project = var.project_id
  role    = "roles/bigquery.admin"
  member  = "user:${var.developer_email}"
}

resource "google_project_iam_member" "developer_functions_admin" {
  project = var.project_id
  role    = "roles/cloudfunctions.admin"
  member  = "user:${var.developer_email}"
}

resource "google_project_iam_member" "developer_run_admin" {
  project = var.project_id
  role    = "roles/run.admin"
  member  = "user:${var.developer_email}"
}

resource "google_project_iam_member" "developer_ai_platform_admin" {
  project = var.project_id
  role    = "roles/aiplatform.admin"
  member  = "user:${var.developer_email}"
}

resource "google_project_iam_member" "developer_documentai_admin" {
  project = var.project_id
  role    = "roles/documentai.admin"
  member  = "user:${var.developer_email}"
}

resource "google_project_iam_member" "developer_datastore_admin" {
  project = var.project_id
  role    = "roles/datastore.owner"
  member  = "user:${var.developer_email}"
}

# Firebase Project for Authentication
resource "google_firebase_project" "default" {
  provider = google-beta
  project  = var.project_id

  depends_on = [google_project_service.required_apis]
}

# Enable Email/Password authentication
resource "google_identity_platform_config" "auth_config" {
  provider = google-beta
  project  = var.project_id

  sign_in {
    allow_duplicate_emails = false

    email {
      enabled           = true
      password_required = true
    }
  }

  authorized_domains = var.authorized_domains

  depends_on = [google_firebase_project.default]
}

# Configure Google as an identity provider
resource "google_identity_platform_default_supported_idp_config" "google_sso" {
  provider = google-beta
  project  = var.project_id

  # Google is one of the "default-supported" IdPs
  idp_id  = "google.com"
  enabled = true

  client_id     = var.google_oauth_client_id
  client_secret = var.google_oauth_client_secret

  depends_on = [
    google_identity_platform_config.auth_config,
    google_project_service.required_apis
  ]
}

# Firebase Admin Service Account
resource "google_service_account" "firebase_admin" {
  account_id   = "firebase-admin-sa"
  display_name = "Firebase Admin Service Account"

  depends_on = [google_project_service.required_apis]
}

resource "google_project_iam_member" "firebase_admin_roles" {
  for_each = toset([
    "roles/firebase.admin",
    "roles/identityplatform.admin",
    "roles/serviceusage.serviceUsageConsumer"
  ])

  project = var.project_id
  role    = each.key
  member  = "serviceAccount:${google_service_account.firebase_admin.email}"
}

# BigQuery tables for vector search
resource "google_bigquery_table" "document_embeddings" {
  dataset_id = google_bigquery_dataset.main.dataset_id
  table_id   = "document_embeddings"

  labels = local.labels

  schema = jsonencode([
    {
      name        = "id"
      type        = "STRING"
      mode        = "REQUIRED"
      description = "Unique id of the chunk"
    },
    {
      name        = "document_id"
      type        = "STRING"
      mode        = "REQUIRED"
      description = "Document this chunk belongs to"
    },
    {
      name        = "reference_id"
      type        = "STRING"
      mode        = "REQUIRED"
      description = "Reference id of the chunk"
    },
    {
      name        = "chunk_text"
      type        = "STRING"
      mode        = "REQUIRED"
      description = "Text of the chunk"
    },
    {
      name        = "embedding"
      type        = "FLOAT"
      mode        = "REPEATED"
      description = "List of chunk embeddings created using Gemini text-embedding-004 model"
    },
    {
      name        = "references"
      type        = "STRING"
      mode        = "REPEATED"
      description = "List of chunk reference_id(s) this chunk references in the text"
    },
    {
      name        = "part"
      type        = "STRING"
      mode        = "NULLABLE"
      description = "Building code part this chunk belongs to (e.g., 'A-2', 'B-9')"
    },
    {
      name        = "metadata"
      type        = "JSON"
      mode        = "NULLABLE"
      description = "Metadata of the chunk"
    },
    {
      name        = "created_at"
      type        = "TIMESTAMP"
      mode        = "REQUIRED"
      description = "Timestamp when the chunk was created"
    }
  ])
}

resource "google_bigquery_table" "edmonton_zoning" {
  dataset_id = google_bigquery_dataset.main.dataset_id
  table_id   = "edmonton_zoning"

  labels = local.labels

  schema = jsonencode([
    {
      name = "address"
      type = "STRING"
      mode = "REQUIRED"
    },
    {
      name = "zone_code"
      type = "STRING"
      mode = "REQUIRED"
    },
    {
      name = "zone_description"
      type = "STRING"
      mode = "NULLABLE"
    },
    {
      name = "applicable_codes"
      type = "STRING"
      mode = "REPEATED"
    },
    {
      name = "last_updated"
      type = "TIMESTAMP"
      mode = "REQUIRED"
    }
  ])
}

# Cloud Run service (will be managed by GitHub Actions for now)
# This is commented out to avoid conflicts with existing deployment
# resource "google_cloud_run_service" "app" {
#   name     = "inplico-code-poc"
#   location = var.region
#
#   template {
#     spec {
#       containers {
#         image = "${var.region}-docker.pkg.dev/${var.project_id}/inplico-code-poc/inplico-code-poc:latest"
#         
#         resources {
#           limits = {
#             cpu    = "1000m"
#             memory = "512Mi"
#           }
#         }
#
#         env {
#           name = "OPENAI_API_KEY"
#           value_from {
#             secret_key_ref {
#               name = "openai-api-key"
#               key  = "latest"
#             }
#           }
#         }
#       }
#
#       container_concurrency = 100
#       timeout_seconds      = 300
#     }
#
#     metadata {
#       annotations = {
#         "autoscaling.knative.dev/maxScale" = "5"
#         "autoscaling.knative.dev/minScale" = "0"
#         "run.googleapis.com/cpu-throttling" = "true"
#       }
#       labels = local.labels
#     }
#   }
#
#   traffic {
#     percent         = 100
#     latest_revision = true
#   }
#
#   depends_on = [google_project_service.required_apis]
# }

# IAM for Cloud Run (allow public access)
# data "google_iam_policy" "public" {
#   binding {
#     role = "roles/run.invoker"
#     members = [
#       "allUsers",
#     ]
#   }
# }

# resource "google_cloud_run_service_iam_policy" "public" {
#   location = google_cloud_run_service.app.location
#   project  = google_cloud_run_service.app.project
#   service  = google_cloud_run_service.app.name

#   policy_data = data.google_iam_policy.public.policy_data
# }

# Grant the default Compute Engine service account access to the secret
resource "google_secret_manager_secret_iam_member" "firebase_admin_key_access" {
  project   = var.project_id
  secret_id = "firebase-admin-key"
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${data.google_project.project.number}-compute@developer.gserviceaccount.com"
}

# Document Processor job with Docker image building
module "document_processor_job" {
  source = "./modules/cloud-run-job"

  name       = "document-processor"
  project_id = var.project_id
  region     = var.region

  labels = local.labels

  artifact_registry_id = "athyna-insight-ai"

  docker_context = "${path.module}/../jobs/document-processor"

  # Environment variables
  environment_variables = {
    GEMINI_API_KEY   = var.gemini_api_key
    OUTPUT_BUCKET    = google_storage_bucket.documents.name
    PYTHONUNBUFFERED = "1"
  }

  # Resource allocation
  resource_limits = {
    cpu    = "4000m" # 4 vCPUs
    memory = "8Gi"   # 8GB RAM
  }

  # Job configuration
  max_retries           = 2                            # Retry failed jobs up to 2 times
  timeout               = "86400s"                     # 24 hour timeout (maximum allowed for Cloud Jobs)
  execution_environment = "EXECUTION_ENVIRONMENT_GEN2" # Use 2nd gen execution environment

  depends_on = [
    google_project_service.required_apis,
    google_storage_bucket.documents
  ]
}

resource "google_storage_bucket_iam_member" "document_processor_storage" {
  bucket = google_storage_bucket.documents.name
  role   = "roles/storage.objectUser"
  member = "serviceAccount:${module.document_processor_job.service_account_email}"
}

# Embedding Generator job with Docker image building
module "embedding_generator_job" {
  source = "./modules/cloud-run-job"

  name       = "embedding-generator"
  project_id = var.project_id
  region     = var.region

  labels = local.labels

  artifact_registry_id = "athyna-insight-ai"

  docker_context = "${path.module}/../jobs/embedding-generator"

  # Environment variables
  environment_variables = {
    GEMINI_API_KEY        = var.gemini_api_key
    GOOGLE_CLOUD_PROJECT  = var.project_id
    GOOGLE_CLOUD_LOCATION = var.region
    BIGQUERY_DATASET      = "inplico_building_codes"
    BIGQUERY_TABLE        = "document_embeddings"
    PYTHONUNBUFFERED      = "1"
  }

  # Resource allocation
  resource_limits = {
    cpu    = "4000m" # 4 vCPUs
    memory = "8Gi"   # 8GB RAM
  }

  # Job configuration
  max_retries           = 2                            # Retry failed jobs up to 2 times
  timeout               = "86400s"                     # 24 hour timeout (maximum allowed for Cloud Jobs)
  execution_environment = "EXECUTION_ENVIRONMENT_GEN2" # Use 2nd gen execution environment

  depends_on = [
    google_project_service.required_apis,
    google_bigquery_table.document_embeddings
  ]
}

resource "google_storage_bucket_iam_member" "embedding_generator_storage" {
  bucket = google_storage_bucket.documents.name
  role   = "roles/storage.objectViewer" # Only needs read access to the bucket
  member = "serviceAccount:${module.embedding_generator_job.service_account_email}"
}

resource "google_project_iam_member" "embedding_generator_bigquery" {
  project = var.project_id
  role    = "roles/bigquery.dataEditor"
  member  = "serviceAccount:${module.embedding_generator_job.service_account_email}"
}

resource "google_project_iam_member" "embedding_generator_vertex_ai_user" {
  project = var.project_id
  role    = "roles/aiplatform.user"
  member  = "serviceAccount:${module.embedding_generator_job.service_account_email}"
}

# Zoning Scraper job with Docker image building
module "zoning_scraper_job" {
  source = "./modules/cloud-run-job"

  name       = "zoning-scraper"
  project_id = var.project_id
  region     = var.region

  labels = local.labels

  artifact_registry_id = "athyna-insight-ai"

  docker_context = "${path.module}/../jobs/zoning-scraper"

  # Environment variables
  environment_variables = {
    GEMINI_API_KEY       = var.gemini_api_key
    OUTPUT_BUCKET        = google_storage_bucket.documents.name
    GOOGLE_CLOUD_PROJECT = var.project_id
    PYTHONUNBUFFERED     = "1"
  }

  # Resource allocation - zoning scraper needs moderate resources for web scraping and LLM processing
  resource_limits = {
    cpu    = "2000m" # 2 vCPUs
    memory = "4Gi"   # 4GB RAM
  }

  # Job configuration
  max_retries           = 0                            # Do not retry failed jobs
  timeout               = "86400s"                     # 24 hour timeout (maximum allowed for Cloud Jobs)
  execution_environment = "EXECUTION_ENVIRONMENT_GEN2" # Use 2nd gen execution environment

  depends_on = [
    google_project_service.required_apis,
    google_storage_bucket.documents
  ]
}

resource "google_storage_bucket_iam_member" "zoning_scraper_storage" {
  bucket = google_storage_bucket.documents.name
  role   = "roles/storage.objectUser"
  member = "serviceAccount:${module.zoning_scraper_job.service_account_email}"
}

resource "google_project_iam_member" "zoning_scraper_vertex_ai_user" {
  project = var.project_id
  role    = "roles/aiplatform.user"
  member  = "serviceAccount:${module.zoning_scraper_job.service_account_email}"
}

# Cloud Function for Building Code Agent
module "building_code_agent" {
  source = "./modules/cloud-function"

  project_id      = var.project_id
  region          = var.region
  function_name   = "building-code-agent"
  description     = "Building Code Agent API using LangChain and Gemini"
  runtime         = "python311"
  memory_mb       = 1024             # 1GB for LLM and RAG operations
  timeout_seconds = 540              # Maximum allowed for HTTP functions
  entry_point     = "cloud_function" # The function name in main.py
  environment_variables = {
    "GEMINI_API_KEY"    = var.gemini_api_key
    "BIGQUERY_DATASET"  = "inplico_building_codes"
    "BIGQUERY_TABLE"    = "document_embeddings"
    "LANGSMITH_API_KEY" = var.langsmith_api_key
    "LANGSMITH_TRACING" = "true"
    "LANGSMITH_PROJECT" = "building-code-agent"
  }
  trigger_type = "http"
  labels       = local.labels

  # Source code will be zipped and uploaded
  source_zip_path = "${path.module}/../functions/building-code-agent.zip"
  source_hash     = filemd5("${path.module}/../functions/building-code-agent.zip")

  allow_public_access = true # This enables public access to the function
  depends_on = [
    google_project_service.required_apis,
    google_storage_bucket.documents
  ]
}

resource "google_project_iam_member" "building_code_agent_bigquery" {
  project = var.project_id
  role    = "roles/bigquery.dataViewer" # Read-only access
  member  = "serviceAccount:${module.building_code_agent.service_account_email}"
}

resource "google_project_iam_member" "building_code_agent_vertex_ai" {
  project = var.project_id
  role    = "roles/aiplatform.user"
  member  = "serviceAccount:${module.building_code_agent.service_account_email}"
}

resource "google_project_iam_member" "building_code_agent_firestore" {
  project = var.project_id
  role    = "roles/datastore.user"
  member  = "serviceAccount:${module.building_code_agent.service_account_email}"
}

# Zone Lookup Cloud Function
module "zone_lookup" {
  source = "./modules/cloud-function"

  project_id      = var.project_id
  region          = var.region
  function_name   = "zone-lookup"
  description     = "Zone Lookup API for Edmonton addresses"
  runtime         = "python311"
  memory_mb       = 256 # Lower memory as it's a simpler function
  timeout_seconds = 60  # Should be sufficient for geocoding + zoning lookup
  entry_point     = "cloud_function"
  environment_variables = {
    "GEOCODING_API_KEY" = var.geocoding_api_key
  }
  trigger_type = "http"
  labels       = local.labels

  # Source code will be zipped and uploaded
  source_zip_path = "${path.module}/../functions/zone-lookup.zip"
  source_hash     = filemd5("${path.module}/../functions/zone-lookup.zip")

  allow_public_access = true # This enables public access to the function
  depends_on = [
    google_project_service.required_apis
  ]
}

# Firestore database for storing business type and occupancy group mappings
resource "google_firestore_database" "database" {
  provider = google-beta
  project  = var.project_id
  name     = "(default)"

  # Use Native mode for better performance
  type = "FIRESTORE_NATIVE"

  # Set the location - should match your region
  location_id = var.region

  # Prevent accidental deletion
  deletion_policy = "DELETE"

  depends_on = [
    google_project_service.required_apis
  ]
}

# Firestore Security Rules for role-based access control
resource "google_firebaserules_ruleset" "firestore_rules" {
  provider = google-beta
  project  = var.project_id

  source {
    files {
      name    = "firestore.rules"
      content = file("${path.module}/../firestore.rules")
    }
  }

  depends_on = [
    google_firestore_database.database,
    google_project_service.required_apis
  ]
}

resource "google_firebaserules_release" "firestore_rules_release" {
  provider     = google-beta
  name         = "cloud.firestore"
  project      = var.project_id
  ruleset_name = google_firebaserules_ruleset.firestore_rules.name

  depends_on = [
    google_firebaserules_ruleset.firestore_rules
  ]
}

# Email notification channels for alerts
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

# Alert policy for Zoning Scraper job failures
resource "google_monitoring_alert_policy" "zoning_scraper_job_failures" {
  display_name = "Zoning Scraper Job Failures"
  combiner     = "OR"
  severity     = "CRITICAL"

  conditions {
    display_name = "Zoning Scraper Job Execution Failed"
    condition_threshold {
      filter          = "resource.type=\"cloud_run_job\" AND resource.labels.job_name=\"zoning-scraper-job\" AND metric.type=\"run.googleapis.com/job/completed_execution_count\" AND metric.label.result=\"failed\""
      comparison      = "COMPARISON_GT"
      threshold_value = 0
      duration        = "0s"

      aggregations {
        alignment_period   = "60s"
        per_series_aligner = "ALIGN_RATE"
      }
    }
  }

  notification_channels = [for channel in google_monitoring_notification_channel.email : channel.id]

  # Right now we will get two alerts for the same job, one for failure and one for resolved. We cannot remove the resolved alert as it is required by Google Monitoring (https://stackoverflow.com/questions/61698380/how-to-stop-resolved-alert-in-google-cloud-stackdriver).
  # If the resolved email is misleading then we can add an alert strategy to auto-close the alert after a certain period, e.g., 24 hours.
  # Uncomment the following lines to enable auto-close after 24 hours
  # alert_strategy {
  #   auto_close = "86400s" # Auto-close after 24 hours
  # }

  documentation {
    content = "The Zoning Scraper job execution has failed. Check the job logs for details."
  }

  depends_on = [google_monitoring_notification_channel.email]

  lifecycle {
    replace_triggered_by = [google_monitoring_notification_channel.email]
  }
}
