#!/bin/bash

# Setup script for GitHub Actions deployment to Google Cloud Run
# Run this script to create the necessary service account and get the key

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Setting up GitHub Actions for Google Cloud deployment${NC}"
echo

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo -e "${RED}❌ gcloud CLI is not installed. Please install it first:${NC}"
    echo "https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Get current project
PROJECT_ID=$(gcloud config get-value project)
if [ -z "$PROJECT_ID" ]; then
    echo -e "${RED}❌ No default project set. Please run:${NC}"
    echo "gcloud config set project YOUR_PROJECT_ID"
    exit 1
fi

echo -e "${GREEN}📋 Using project: ${PROJECT_ID}${NC}"

# Service account details
SA_NAME="github-actions-deployer"
SA_EMAIL="${SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"
SA_KEY_FILE="github-actions-key.json"

echo -e "${YELLOW}🔧 Creating service account...${NC}"

# Create service account
gcloud iam service-accounts create $SA_NAME \
    --display-name="GitHub Actions Deployer" \
    --description="Service account for GitHub Actions to deploy to Cloud Run"

echo -e "${YELLOW}🔐 Granting necessary permissions...${NC}"

# Grant necessary roles
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:${SA_EMAIL}" \
    --role="roles/run.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:${SA_EMAIL}" \
    --role="roles/storage.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:${SA_EMAIL}" \
    --role="roles/iam.serviceAccountUser"

echo -e "${YELLOW}🔑 Creating service account key...${NC}"

# Create and download key
gcloud iam service-accounts keys create $SA_KEY_FILE \
    --iam-account=$SA_EMAIL

echo -e "${GREEN}✅ Setup complete!${NC}"
echo
echo -e "${YELLOW}📝 Next steps:${NC}"
echo "1. Go to your GitHub repository settings"
echo "2. Navigate to Settings > Secrets and variables > Actions"
echo "3. Add these repository secrets:"
echo
echo -e "${GREEN}   GCP_PROJECT_ID${NC} = ${PROJECT_ID}"
echo -e "${GREEN}   GCP_SA_KEY${NC} = contents of ${SA_KEY_FILE}"
echo
echo -e "${YELLOW}📄 To get the GCP_SA_KEY content:${NC}"
echo "cat ${SA_KEY_FILE}"
echo
echo -e "${RED}⚠️  Important: Delete the ${SA_KEY_FILE} file after adding it to GitHub secrets${NC}"
echo "rm ${SA_KEY_FILE}" 