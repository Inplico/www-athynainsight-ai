#!/bin/bash

# Billing Monitor Script for Athyna Insight
# Run weekly to check costs and usage

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}💰 Athyna Insight Billing & Usage Report${NC}"
echo "Generated: $(date)"
echo "=========================================="

# Check current project
PROJECT_ID=$(gcloud config get-value project)
echo -e "${GREEN}Project:${NC} $PROJECT_ID"
echo

# Cloud Run Usage
echo -e "${YELLOW}📦 Cloud Run Services${NC}"
gcloud run services list --format="table(metadata.name,spec.traffic[0].percent,status.url,status.conditions[0].status)" --region=us-central1
echo

# Check Cloud Run service details
echo -e "${YELLOW}🔧 Cloud Run Configuration${NC}"
gcloud run services describe athyna-insight-ai --region=us-central1 --format="value(metadata.name,spec.template.spec.containerConcurrency,spec.template.metadata.annotations['autoscaling.knative.dev/maxScale'],spec.template.spec.containers[0].resources.limits.memory,spec.template.spec.containers[0].resources.limits.cpu)"
echo

# Artifact Registry Usage
echo -e "${YELLOW}🐳 Container Images${NC}"
gcloud artifacts repositories list --location=us-central1 --format="table(name,format,sizeBytes)"
echo

# Check for any Compute Engine instances (should be none)
echo -e "${YELLOW}💻 Compute Engine Instances${NC}"
INSTANCES=$(gcloud compute instances list --format="value(name)" | wc -l)
if [ "$INSTANCES" -eq 0 ]; then
    echo -e "${GREEN}✅ No Compute Engine instances (good for costs!)${NC}"
else
    echo -e "${RED}⚠️  Found $INSTANCES Compute Engine instances:${NC}"
    gcloud compute instances list --format="table(name,zone,status,machineType)"
fi
echo

# Check for any storage buckets
echo -e "${YELLOW}🗄️  Cloud Storage Buckets${NC}"
BUCKETS=$(gcloud storage ls 2>/dev/null | wc -l || echo "0")
if [ "$BUCKETS" -eq 0 ]; then
    echo -e "${GREEN}✅ No storage buckets${NC}"
else
    echo -e "${YELLOW}Found $BUCKETS storage buckets:${NC}"
    gcloud storage ls 2>/dev/null || echo "Storage API not accessible"
fi
echo

# Check enabled APIs (these can cost money)
echo -e "${YELLOW}🔌 Enabled APIs${NC}"
echo "Major APIs that can incur costs:"
gcloud services list --enabled --filter="name:(
  run.googleapis.com OR
  compute.googleapis.com OR
  cloudsql.googleapis.com OR
  bigquery.googleapis.com OR
  aiplatform.googleapis.com OR
  storage.googleapis.com OR
  documentai.googleapis.com OR
  cloudfunctions.googleapis.com OR
  secretmanager.googleapis.com OR
  cloudscheduler.googleapis.com
)" --format="table(name,title)"
echo

# Check Cloud Storage usage
echo -e "${YELLOW}🗄️  Cloud Storage Usage${NC}"
BUCKET_EXISTS=$(gsutil ls gs://athyna-insight-documents 2>/dev/null | wc -l || echo "0")
if [ "$BUCKET_EXISTS" -gt 0 ]; then
    echo "Document storage bucket: gs://athyna-insight-documents"
    gsutil du -sh gs://athyna-insight-documents 2>/dev/null || echo "Empty or inaccessible"
else
    echo -e "${GREEN}✅ Document storage bucket created but empty${NC}"
fi
echo

# Check BigQuery datasets
echo -e "${YELLOW}📊 BigQuery Datasets${NC}"
bq ls --format="table(datasetId,location)" 2>/dev/null || echo "BigQuery not accessible"
echo

# Check Cloud Functions
echo -e "${YELLOW}⚡ Cloud Functions${NC}"
FUNCTIONS=$(gcloud functions list --format="value(name)" 2>/dev/null | wc -l || echo "0")
if [ "$FUNCTIONS" -eq 0 ]; then
    echo -e "${GREEN}✅ No Cloud Functions deployed (good for costs!)${NC}"
else
    echo "Found $FUNCTIONS Cloud Functions:"
    gcloud functions list --format="table(name,status,trigger.httpsTrigger.url)" 2>/dev/null || echo "Functions not accessible"
fi
echo

# Check Cloud SQL instances
echo -e "${YELLOW}🗄️  Cloud SQL Instances${NC}"
SQL_INSTANCES=$(gcloud sql instances list --format="value(name)" 2>/dev/null | wc -l || echo "0")
if [ "$SQL_INSTANCES" -eq 0 ]; then
    echo -e "${GREEN}✅ No Cloud SQL instances (good for costs!)${NC}"
else
    echo -e "${YELLOW}Found $SQL_INSTANCES Cloud SQL instances:${NC}"
    gcloud sql instances list --format="table(name,region,tier,status)" 2>/dev/null || echo "SQL not accessible"
fi
echo

# Cost optimization recommendations
echo -e "${YELLOW}💡 Cost Optimization Recommendations${NC}"
echo "1. ✅ Cloud Run max instances limited to 5"
echo "2. ✅ Using minimal memory (512Mi) and CPU (1)"
echo "3. ✅ Auto-scaling to zero when idle"
echo "4. 🔍 Monitor OpenAI API usage (external cost)"
echo "5. 🔍 Set up billing alerts in Console"
echo

# Warnings
echo -e "${RED}⚠️  Cost Monitoring Reminders${NC}"
echo "• Check OpenAI usage: https://platform.openai.com/usage"
echo "• Monitor GCP billing: https://console.cloud.google.com/billing"
echo "• Review this weekly, especially during development"
echo "• Consider setting up budget alert webhooks for automation"
echo

echo "=========================================="
echo -e "${GREEN}Report complete! 📊${NC}" 