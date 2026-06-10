# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Run TypeScript type checking
npm run type-check
```

## Deployment

```bash
# Deploy to Google Cloud Run
./deploy.sh

# Set environment variables before deploying
export LOOPS_API_KEY="your-api-key"
export GCP_PROJECT_ID="inplico-building-codes"
```

## Architecture Overview

This is a Next.js 15 (App Router) marketing website for Athyna Insight, focused on lead capture for a building code AI platform. The application is deployed on Google Cloud Run as a serverless container.

### Key Components

**Lead Capture System**: The primary feature is a segmented lead capture form (`src/components/sections/lead-capture.tsx`) that categorizes users into three segments:
- Building Code Experts (architects, engineers, city officials)
- Real Estate Professionals
- Construction Companies

**Email Integration**: Integrated with Loops.so for email marketing:
- API endpoint at `/api/loops-capture` handles form submissions
- Sends welcome emails via transactional email ID: `cme7obk820gpkz80iendjszqt`
- Tracks user segments via `userGroup` field

**Content Management**: Blog posts are stored as markdown files in `src/content/blog/` and rendered dynamically. The system uses remark for markdown processing with GitHub Flavored Markdown support.

### Project Structure

- `src/app/` - Next.js App Router pages and API routes
- `src/components/` - React components organized by type (layout, sections, ui)
- `src/lib/` - Shared utilities, constants, and type definitions
- `src/content/blog/` - Markdown blog posts
- `scripts/` - Deployment and setup scripts
- `terraform/` - Infrastructure as Code (primarily managed in inplico-code-poc repo)

### Styling

Uses Tailwind CSS with custom configuration:
- Custom color scheme based on orange primary (`#f97316`)
- Typography plugin for prose content
- Component variants managed with `class-variance-authority`

### Infrastructure

- **Hosting**: Google Cloud Run (serverless, scales to zero)
- **Container Registry**: Artifact Registry at `us-central1-docker.pkg.dev/inplico-building-codes/athyna-insight-ai/`
- **DNS**: Managed via Google Cloud DNS (configured in inplico-code-poc terraform)
- **Project ID**: `inplico-building-codes`
- **Region**: `us-central1`

### Environment Variables

- `LOOPS_API_KEY` - Required for email marketing integration

### Testing Approach

No test framework is currently configured. For testing needs, consider adding Jest with React Testing Library for component tests.