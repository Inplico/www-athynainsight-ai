output "name" {
  description = "Name of the Cloud Run Job"
  value       = google_cloud_run_v2_job.job.name
}

output "service_account_email" {
  description = "The email of the service account used by the job"
  value       = google_service_account.sa.email
}

output "image_uri" {
  description = "The full URI of the container image used by the job"
  value       = "${var.region}-docker.pkg.dev/${var.project_id}/${var.artifact_registry_id}/${var.name}:latest"
}

output "execution_uri" {
  description = "The URI to view job executions in Google Cloud Console"
  value       = "https://console.cloud.google.com/run/jobs?project=${var.project_id}&runjob_region=${var.region}"
}

output "logs_uri" {
  description = "The URI to view job logs in Google Cloud Console"
  value       = "https://console.cloud.google.com/logs/query;query=resource.type%3D%22cloud_run_job%22%0Aresource.labels.job_name%3D%22${google_cloud_run_v2_job.job.name}%22;cursorTimestamp=now-1h?project=${var.project_id}"
}