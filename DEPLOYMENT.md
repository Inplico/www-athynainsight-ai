# Deployment Guide for Athyna Insight AI Website

This guide will help you deploy the Athyna Insight AI website to Google Cloud Run using GitHub Actions for CI/CD.

## Overview

The deployment uses:
- **Next.js** with standalone output for Docker containerization
- **Google Cloud Run** for hosting the containerized application
- **Google Artifact Registry** for container image storage
- **GitHub Actions** for automated CI/CD pipeline
- **Terraform** for Infrastructure as Code (optional)

## Prerequisites

1. **Google Cloud Project**: Create or use an existing GCP project
2. **gcloud CLI**: Install and authenticate with GCP
3. **GitHub Repository**: Push your code to GitHub
4. **Docker** (optional for local testing)

## Quick Deployment Steps

### 1. Set up Google Cloud

```bash
# Install gcloud CLI if not already installed
# https://cloud.google.com/sdk/docs/install

# Authenticate and set project
gcloud auth login
gcloud config set project YOUR_PROJECT_ID

# Enable required APIs
gcloud services enable run.googleapis.com
gcloud services enable artifactregistry.googleapis.com
```

### 2. Set up GitHub Actions

Run the setup script:

```bash
./scripts/setup-github-actions.sh
```

This will:
- Create a service account for GitHub Actions
- Grant necessary permissions
- Generate a service account key

### 3. Configure GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add these repository secrets:
- `GCP_PROJECT_ID`: Your Google Cloud Project ID
- `GCP_SA_KEY`: Contents of the service account key JSON file

### 4. Deploy

Push to the `main` branch or manually trigger the GitHub Action:

```bash
git add .
git commit -m "Initial deployment setup"
git push origin main
```

The GitHub Action will:
1. Build the Docker image
2. Push to Google Artifact Registry  
3. Deploy to Cloud Run
4. Show the deployment URL

## Advanced Setup with Terraform

For Infrastructure as Code, use Terraform:

### Simple Setup (Recommended)

```bash
./scripts/setup-terraform-simple.sh
```

This uses simplified configuration files:
- `terraform/main-simple.tf`
- `terraform/variables-simple.tf`
- `terraform/terraform-simple.tfvars.example`

### Full Setup (Complex)

```bash
./scripts/setup-terraform.sh
```

Uses the complete infrastructure setup from the original project.

## File Structure

```
├── .github/workflows/
│   └── deploy-gcp.yml          # GitHub Actions workflow
├── scripts/
│   ├── setup-github-actions.sh # GitHub Actions setup
│   ├── setup-terraform-simple.sh # Simplified Terraform setup
│   ├── setup-terraform.sh       # Full Terraform setup
│   └── billing-monitor.sh       # Cost monitoring
├── terraform/
│   ├── main-simple.tf          # Simplified Terraform config
│   ├── variables-simple.tf     # Simplified variables
│   ├── main.tf                 # Full Terraform config (complex)
│   └── variables.tf            # Full variables (complex)
├── Dockerfile                  # Container configuration
├── next.config.ts             # Next.js config (with standalone output)
└── DEPLOYMENT.md              # This file
```

## Key Modifications Made

### 1. Simplified Dockerfile
- Removed Firebase-specific build arguments
- Streamlined for basic Next.js application
- Maintained Docker best practices

### 2. Updated GitHub Actions Workflow
- Changed service name from `inplico-code-poc` to `www-athynainsight-ai`
- Removed Firebase environment variables
- Simplified deployment configuration

### 3. Next.js Configuration
- Added `output: 'standalone'` for Docker compatibility
- Enables optimized container builds

### 4. Terraform Options
- **Simple**: Basic Cloud Run + Artifact Registry setup
- **Complex**: Full infrastructure with BigQuery, Cloud Functions, etc.

## Cost Monitoring

Monitor your GCP costs with:

```bash
./scripts/billing-monitor.sh
```

This script checks:
- Cloud Run instances and configuration
- Artifact Registry usage
- Enabled APIs
- Cost optimization recommendations

## Environment Variables

For a basic website, no environment variables are required. If you need to add environment variables later:

1. Add them to the GitHub Action workflow in `deploy-gcp.yml`
2. Add corresponding GitHub Secrets
3. Update the Dockerfile if build-time variables are needed

## Troubleshooting

### Build Fails
- Check that `next.config.ts` has `output: 'standalone'`
- Verify all dependencies are in `package.json`

### Deployment Fails
- Check GitHub Secrets are set correctly
- Verify GCP service account has necessary permissions
- Ensure APIs are enabled in your GCP project

### Service Not Accessible
- Check Cloud Run service allows unauthenticated access
- Verify the service is deployed to the correct region

## Next Steps

1. **Custom Domain**: Set up a custom domain in Cloud Run
2. **SSL Certificate**: Configure managed SSL certificates
3. **CDN**: Add Cloud CDN for global performance
4. **Monitoring**: Set up logging and monitoring alerts
5. **Staging Environment**: Create separate environments for staging/prod

## Support

For issues specific to this deployment setup, check:
1. GitHub Actions logs in your repository
2. Cloud Run logs in GCP Console
3. Docker build logs for container issues

The deployment configuration is based on a previous project but simplified for static website hosting.