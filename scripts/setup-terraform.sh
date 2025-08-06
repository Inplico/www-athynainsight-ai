#!/bin/bash

# Setup Terraform for Athyna Website infrastructure

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}Setting up Terraform for Athyna Website infrastructure...${NC}"

# Check if terraform is installed
command -v terraform >/dev/null 2>&1 || { 
    echo -e "${RED}Terraform is required but not installed.${NC}" 
    echo "Install from: https://www.terraform.io/downloads"
    exit 1; 
}

cd terraform

# Create terraform.tfvars if it doesn't exist
if [ ! -f terraform.tfvars ]; then
    echo -e "${BLUE}Creating terraform.tfvars file...${NC}"
    cat > terraform.tfvars <<EOF
# GCP Project Configuration
project_id = "your-project-id"
region     = "us-central1"

# Replace with your actual project ID
EOF
    echo -e "${YELLOW}Please edit terraform/terraform.tfvars with your GCP project ID${NC}"
fi

# Initialize Terraform
echo -e "${BLUE}Initializing Terraform...${NC}"
terraform init

# Validate configuration
echo -e "${BLUE}Validating Terraform configuration...${NC}"
terraform validate

# Plan the deployment
echo -e "${BLUE}Planning infrastructure deployment...${NC}"
terraform plan

echo -e "${GREEN}✓ Terraform setup complete!${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "1. Edit terraform/terraform.tfvars with your GCP project ID"
echo "2. Run: terraform apply"
echo "3. After apply completes, get the nameservers:"
echo "   terraform output athyna_nameservers"
echo "4. Update your domain registrar (GoDaddy/Namecheap) with the nameservers"
echo ""
echo -e "${YELLOW}Important: Domain propagation can take up to 48 hours${NC}"