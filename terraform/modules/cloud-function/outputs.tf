output "function_name" {
  description = "Name of the Cloud Function"
  value       = google_cloudfunctions2_function.function.name
}

output "function_url" {
  description = "URL of the Cloud Function (for HTTP triggers)"
  value       = var.trigger_type == "http" ? google_cloudfunctions2_function.function.service_config[0].uri : null
}

output "function_trigger_url" {
  description = "Trigger URL of the Cloud Function"
  value       = google_cloudfunctions2_function.function.service_config[0].uri
}

output "source_bucket" {
  description = "Name of the source code bucket"
  value       = google_storage_bucket.function_source.name
}

output "service_account_email" {
  description = "The email of the service account used by the function"
  value       = google_cloudfunctions2_function.function.service_config[0].service_account_email
}