#!/bin/bash

# Deploy script for Athyna Website to GCP Cloud Run

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_ID=${GCP_PROJECT_ID:-"your-project-id"}
REGION=${GCP_REGION:-"us-central1"}
SERVICE_NAME="athyna-website"
IMAGE_NAME="athyna-website"

echo -e "${BLUE}Starting deployment of Athyna Website...${NC}"

# Check if required tools are installed
command -v gcloud >/dev/null 2>&1 || { echo -e "${RED}gcloud CLI is required but not installed.${NC}" >&2; exit 1; }
command -v docker >/dev/null 2>&1 || { echo -e "${RED}Docker is required but not installed.${NC}" >&2; exit 1; }

# Check if logged in to gcloud
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q .; then
    echo -e "${RED}Not logged in to gcloud. Please run: gcloud auth login${NC}"
    exit 1
fi

# Set the project
echo -e "${BLUE}Setting GCP project to: $PROJECT_ID${NC}"
gcloud config set project $PROJECT_ID

# Enable required APIs
echo -e "${BLUE}Enabling required GCP APIs...${NC}"
gcloud services enable \
    run.googleapis.com \
    containerregistry.googleapis.com \
    cloudbuild.googleapis.com \
    compute.googleapis.com \
    dns.googleapis.com

# Configure Docker for GCR
echo -e "${BLUE}Configuring Docker for Google Container Registry...${NC}"
gcloud auth configure-docker

# Build the Docker image
echo -e "${BLUE}Building Docker image...${NC}"
docker build -t gcr.io/$PROJECT_ID/$IMAGE_NAME:latest .

# Push the image to GCR
echo -e "${BLUE}Pushing image to Container Registry...${NC}"
docker push gcr.io/$PROJECT_ID/$IMAGE_NAME:latest

# Deploy to Cloud Run
echo -e "${BLUE}Deploying to Cloud Run...${NC}"
gcloud run deploy $SERVICE_NAME \
    --image gcr.io/$PROJECT_ID/$IMAGE_NAME:latest \
    --region $REGION \
    --platform managed \
    --allow-unauthenticated \
    --port 3000 \
    --memory 512Mi \
    --cpu 1 \
    --min-instances 0 \
    --max-instances 10 \
    --set-env-vars NODE_ENV=production

# Get the service URL
SERVICE_URL=$(gcloud run services describe $SERVICE_NAME --region $REGION --format 'value(status.url)')

echo -e "${GREEN}✓ Deployment successful!${NC}"
echo -e "${GREEN}Service URL: $SERVICE_URL${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "1. Run terraform to set up DNS and load balancer:"
echo "   cd terraform && terraform init && terraform apply"
echo ""
echo "2. After terraform completes, update your domain registrar with these nameservers:"
echo "   (Run: terraform output athyna_nameservers)"
echo ""
echo "3. DNS propagation may take up to 48 hours"