# Athyna Insight Website

Simple lead capture landing page for collecting early access signups for the building code AI platform.

## Quick Start

### 1. Deploy the Website

```bash
# Deploy to Cloud Run (uses existing GCP project)
./deploy.sh
```

### 2. Set up DNS (in inplico-code-poc)

The DNS configuration is managed in the main infrastructure repository:

```bash
cd ../inplico-code-poc/terraform
terraform apply

# Get nameservers for domain configuration
terraform output athyna_nameservers
```

Update your domain registrar (GoDaddy/Namecheap) with the nameservers from the output.

## Features

- **Lead Capture Form** with three user segments:
  - Building Code Experts (architects, city officials, technologists)
  - Real Estate Professionals
  - Construction Companies (with company size selection)
- **Loops Integration Ready** - Prepared for email marketing platform
- **Mobile Responsive** - Optimized for all devices
- **Fast Loading** - Next.js with server-side rendering

## Project Structure

```
├── src/
│   ├── app/                     # Next.js app router pages
│   ├── components/
│   │   ├── layout/              # Header, footer components
│   │   ├── sections/            # Page sections
│   │   │   ├── simple-hero.tsx # Hero section
│   │   │   └── lead-capture.tsx # Lead capture form
│   │   └── ui/                  # Reusable UI components
│   └── lib/                     # Utilities and constants
├── public/
│   └── images/
│       └── brand/               # Logo and brand assets
├── deploy.sh                    # Deployment script
├── Dockerfile                   # Container configuration
└── next.config.ts              # Next.js configuration
```

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deployment

### Manual Deployment

Run the deployment script:
```bash
./deploy.sh
```

### GitHub Actions (Automated)

Push to `main` branch to automatically deploy.

Required GitHub Secrets:
- `GCP_PROJECT_ID` - Your GCP project ID
- `GCP_SA_KEY` - Service account key JSON

## Infrastructure

- **Hosting**: Google Cloud Run (serverless containers)
- **Registry**: Artifact Registry (athyna-insight-ai)
- **DNS**: Google Cloud DNS (managed via terraform in inplico-code-poc)
- **SSL**: Google-managed SSL certificates
- **Load Balancer**: Global HTTPS load balancer

## Environment Variables

When ready to integrate Loops:
- `LOOPS_API_KEY` - Your Loops API key

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Docker
- Google Cloud Run

## Related Repositories

- [inplico-code-poc](../inplico-code-poc) - Main infrastructure and building code AI platform

## License

Copyright © 2024 Athyna Insight Inc.