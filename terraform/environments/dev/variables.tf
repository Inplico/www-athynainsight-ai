variable "project_id" {
  description = "The GCP project ID"
  type        = string
  default     = "inplico-building-codes"
}

variable "region" {
  description = "The GCP region for resources"
  type        = string
  default     = "us-central1"
}

variable "owner_email" {
  description = "Email of the project owner"
  type        = string
} 