output "project_id" {
  description = "The GCP project ID"
  value       = var.project_id
}

output "region" {
  description = "The GCP region used for resources"
  value       = var.region
}

output "artifact_registry_repository_url" {
  description = "URL of the Artifact Registry repository"
  value       = "${var.region}-docker.pkg.dev/${var.project_id}/${google_artifact_registry_repository.container_repo.repository_id}"
}

output "storage_bucket_name" {
  description = "Name of the Cloud Storage bucket for documents"
  value       = google_storage_bucket.documents.name
}

output "storage_bucket_url" {
  description = "URL of the Cloud Storage bucket"
  value       = google_storage_bucket.documents.url
}

output "bigquery_dataset_id" {
  description = "ID of the BigQuery dataset"
  value       = google_bigquery_dataset.main.dataset_id
}

output "bigquery_dataset_location" {
  description = "Location of the BigQuery dataset"
  value       = google_bigquery_dataset.main.location
}

output "document_embeddings_table_id" {
  description = "Full ID of the document embeddings table"
  value       = "${google_bigquery_dataset.main.project}.${google_bigquery_dataset.main.dataset_id}.${google_bigquery_table.document_embeddings.table_id}"
}

output "edmonton_zoning_table_id" {
  description = "Full ID of the Edmonton zoning table"
  value       = "${google_bigquery_dataset.main.project}.${google_bigquery_dataset.main.dataset_id}.${google_bigquery_table.edmonton_zoning.table_id}"
}

# output "cloud_run_url" {
#   description = "URL of the Cloud Run service"
#   value       = google_cloud_run_service.app.status[0].url
# }

output "zone_lookup_function_url" {
  description = "URL of the Zone Lookup Cloud Function"
  value       = module.zone_lookup.function_trigger_url
}

output "building_code_agent_url" {
  description = "URL of the Building Code Agent Cloud Function"
  value       = module.building_code_agent.function_trigger_url
}

output "document_processor_job_name" {
  description = "The name of the document processor Cloud Run Job"
  value       = module.document_processor_job.name
}

output "embedding_generator_job_name" {
  description = "The name of the embedding generator Cloud Run Job"
  value       = module.embedding_generator_job.name
}

output "zoning_scraper_job_name" {
  description = "The name of the zoning scraper Cloud Run Job"
  value       = module.zoning_scraper_job.name
}

output "enabled_apis" {
  description = "List of enabled Google Cloud APIs"
  value       = [for api in google_project_service.required_apis : api.service]
} 
