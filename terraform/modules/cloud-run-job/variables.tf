variable "name" {
  description = "Name of the Cloud Run Job"
  type        = string
}

variable "project_id" {
  description = "The GCP project ID"
  type        = string
}

variable "region" {
  description = "The GCP region"
  type        = string
}

variable "labels" {
  description = "A map of labels to apply to the Cloud Run Job"
  type        = map(string)
  default     = {}
}

variable "environment_variables" {
  description = "A map of environment variables to set in the container"
  type        = map(string)
  default     = {}
}

variable "resource_limits" {
  description = "Resource limits for the container"
  type        = map(string)
  default = {
    cpu    = "1000m"
    memory = "2Gi"
  }
}

variable "max_retries" {
  description = "Number of retries allowed for the job"
  type        = number
  default     = 3
}

variable "execution_environment" {
  description = "The execution environment for the job"
  type        = string
  default     = "EXECUTION_ENVIRONMENT_GEN2"
}

variable "timeout" {
  description = "Maximum time the job can run before being automatically terminated"
  type        = string
  default     = "3600s"  # 1 hour default
}

variable "docker_context" {
  description = "Path to the Docker build context directory"
  type        = string
  default     = ""
}

variable "artifact_registry_id" {
  description = "The id of the Artifact Registry repository"
  type        = string
  default     = ""
}