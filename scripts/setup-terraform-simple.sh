#!/bin/bash

# Simplified Terraform Setup Script for Athyna Insight AI website
# Run this to initialize Terraform for the first time

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🏗️  Athyna Insight AI - Simple Terraform Setup${NC}"
echo "This script will help you set up basic Cloud Run deployment"
echo "=========================================="

# Check if Terraform is installed
if ! command -v terraform &> /dev/null; then
    echo -e "${RED}❌ Terraform not found${NC}"
    echo "Installing Terraform via Homebrew..."
    if command -v brew &> /dev/null; then
        brew install terraform
    else
        echo -e "${RED}Please install Terraform manually: https://learn.hashicorp.com/tutorials/terraform/install-cli${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✅ Terraform found: $(terraform version --json | jq -r .terraform_version)${NC}"
fi

# Check if gcloud is configured
if ! gcloud config get-value project &> /dev/null; then
    echo -e "${RED}❌ gcloud not configured${NC}"
    echo "Please run: gcloud auth login && gcloud config set project YOUR-PROJECT-ID"
    exit 1
else
    PROJECT_ID=$(gcloud config get-value project)
    echo -e "${GREEN}✅ gcloud configured for project: $PROJECT_ID${NC}"
fi

# Navigate to terraform directory
cd "$(dirname "$0")/../terraform"

# Set up terraform.tfvars if it doesn't exist
if [ ! -f "terraform.tfvars" ]; then
    echo -e "${YELLOW}📝 Setting up terraform.tfvars${NC}"
    cp terraform-simple.tfvars.example terraform.tfvars
    
    # Update project_id
    sed -i.bak "s/your-gcp-project-id/$PROJECT_ID/g" terraform.tfvars
    rm terraform.tfvars.bak
    echo -e "${GREEN}✅ Set project_id to: $PROJECT_ID${NC}"
    
    # Get user email from gcloud
    USER_EMAIL=$(gcloud config get-value account)
    if [ ! -z "$USER_EMAIL" ]; then
        sed -i.bak "s/admin@athynainsight.ai/$USER_EMAIL/g" terraform.tfvars
        rm terraform.tfvars.bak
        echo -e "${GREEN}✅ Set notification email to: $USER_EMAIL${NC}"
    else
        echo -e "${YELLOW}⚠️  Please edit terraform.tfvars and set your email${NC}"
    fi
else
    echo -e "${GREEN}✅ terraform.tfvars already exists${NC}"
fi

# Initialize Terraform with simple config
echo -e "${YELLOW}🔧 Initializing Terraform...${NC}"
terraform init

# Validate configuration
echo -e "${YELLOW}✅ Validating Terraform configuration...${NC}"
terraform validate -var-file="$(pwd)/terraform.tfvars"

echo ""
echo -e "${GREEN}🎉 Simple Terraform setup complete!${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "1. Review terraform.tfvars and update values as needed"
echo "2. Run: terraform plan -var-file=terraform.tfvars"
echo "3. If everything looks good, run: terraform apply -var-file=terraform.tfvars"
echo ""
echo -e "${YELLOW}⚠️  Important:${NC}"
echo "• This is a simplified config for basic website deployment"
echo "• Use main-simple.tf and variables-simple.tf for deployment"
echo "• The original complex Terraform files are preserved as backups"
echo ""
echo "Files to use:"
echo "• main-simple.tf (instead of main.tf)"
echo "• variables-simple.tf (instead of variables.tf)"
echo "• terraform-simple.tfvars.example (template)"