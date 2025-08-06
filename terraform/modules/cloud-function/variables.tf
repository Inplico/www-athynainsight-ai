variable "project_id" {
  description = "The GCP project ID"
  type        = string
}

variable "region" {
  description = "The GCP region for the function"
  type        = string
}

variable "function_name" {
  description = "Name of the Cloud Function"
  type        = string
}

variable "description" {
  description = "Description of the Cloud Function"
  type        = string
}

variable "runtime" {
  description = "Runtime for the function (e.g., python311, nodejs18)"
  type        = string
  default     = "python311"
}

variable "memory_mb" {
  description = "Memory allocation for the function in MB"
  type        = number
  default     = 256
}

variable "timeout_seconds" {
  description = "Timeout for the function in seconds"
  type        = number
  default     = 60
}

variable "entry_point" {
  description = "Entry point function name"
  type        = string
}

variable "source_zip_path" {
  description = "Path to the function source code zip file"
  type        = string
}

variable "source_hash" {
  description = "Hash of the source code for versioning"
  type        = string
}

variable "trigger_type" {
  description = "Type of trigger (http, storage, pubsub)"
  type        = string

  validation {
    condition     = contains(["http", "storage", "pubsub"], var.trigger_type)
    error_message = "Trigger type must be http, storage, or pubsub."
  }
}

variable "trigger_resource" {
  description = "Resource that triggers the function (e.g., bucket name for storage trigger)"
  type        = string
  default     = ""
}

variable "security_level" {
  description = "Security level for HTTPS trigger"
  type        = string
  default     = "SECURE_ALWAYS"
}

variable "allow_public_access" {
  description = "Whether to allow public access for HTTP triggers"
  type        = bool
  default     = false
}

variable "service_account_email" {
  description = "Service account email for the function"
  type        = string
  default     = null
}

variable "environment_variables" {
  description = "Environment variables for the function"
  type        = map(string)
  default     = {}
}

variable "labels" {
  description = "Labels to apply to the function"
  type        = map(string)
  default     = {}
}

variable "enabled_apis" {
  description = "List of enabled APIs (for dependency management)"
  type        = list(string)
  default     = []
} 