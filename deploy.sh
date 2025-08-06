#!/bin/bash

# Simple deployment script for Athyna Website
# Uses existing infrastructure from inplico-code-poc

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration - should match inplico-code-poc project
PROJECT_ID=${GCP_PROJECT_ID:-"inplico-building-codes"}
REGION="us-central1"
SERVICE_NAME="athyna-website"
REPOSITORY="athyna-insight-ai"  # Matches the artifact registry in terraform

echo -e "${BLUE}Deploying Athyna Website...${NC}"
echo "Project: $PROJECT_ID"
echo "Region: $REGION"
echo "Service: $SERVICE_NAME"

# Check if logged in to gcloud
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q .; then
    echo -e "${RED}Not logged in to gcloud. Please run: gcloud auth login${NC}"
    exit 1
fi

# Set the project
gcloud config set project $PROJECT_ID

# Configure Docker for Artifact Registry
echo -e "${BLUE}Configuring Docker...${NC}"
gcloud auth configure-docker us-central1-docker.pkg.dev

# Build the Docker image
echo -e "${BLUE}Building Docker image...${NC}"
docker build -t us-central1-docker.pkg.dev/$PROJECT_ID/$REPOSITORY/$SERVICE_NAME:latest .

# Push the image
echo -e "${BLUE}Pushing image to Artifact Registry...${NC}"
docker push us-central1-docker.pkg.dev/$PROJECT_ID/$REPOSITORY/$SERVICE_NAME:latest

# Deploy to Cloud Run
echo -e "${BLUE}Deploying to Cloud Run...${NC}"
gcloud run deploy $SERVICE_NAME \
    --image us-central1-docker.pkg.dev/$PROJECT_ID/$REPOSITORY/$SERVICE_NAME:latest \
    --region $REGION \
    --platform managed \
    --allow-unauthenticated \
    --port 3000 \
    --memory 512Mi \
    --cpu 1 \
    --min-instances 0 \
    --max-instances 10

# Get the service URL
SERVICE_URL=$(gcloud run services describe $SERVICE_NAME --region $REGION --format 'value(status.url)')

echo -e "${GREEN}✓ Deployment successful!${NC}"
echo -e "${GREEN}Service URL: $SERVICE_URL${NC}"
echo ""
echo -e "${BLUE}Next steps for DNS setup:${NC}"
echo "1. Add DNS records in the existing terraform configuration"
echo "2. Point athynainsight.ai to the Cloud Run service"