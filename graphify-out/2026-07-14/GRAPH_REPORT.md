# Graph Report - .  (2026-07-14)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 302 nodes · 367 edges · 34 communities (17 shown, 17 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.88)
- Token cost: 1,027 input · 293 output

## Graph Freshness
- Built from commit: `2097be0c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Page Layout Components
- Development Tooling Config
- UI Header and Banner
- TypeScript Configuration
- Frontend Library Dependencies
- Project Documentation and Setup
- Blog System Logic
- Global Layout and Navigation
- Project Scripts and Metadata
- Loops Email API Integration
- Interactive Page Components
- Loops API Testing Utilities
- ESLint Configuration
- AI Development Articles
- AI Industry Analysis
- AI Automation Case Studies
- Parallax Animation Effects
- Deployment Shell Scripts
- Next.js Configuration
- PostCSS Configuration
- Billing Monitoring Scripts
- Deployment Shell Scripts
- GitHub Actions Setup
- Terraform Infrastructure Scripts
- Simplified Terraform Scripts
- Tailwind CSS Configuration
- Brand Identity Assets
- Brand Identity Assets
- Athena AI Logo Original
- Scaling Your Startup: Key Lessons for Building Hyper-Scalable Architectures
- From Frustrated to Flourishing: How Agentic AI is Transforming Business
- Emotional Architecture: AI and the Non-Dual Nature of Consciousness
- The LLMOps Revolution: How Leading Organizations Are Transforming Through AI

## God Nodes (most connected - your core abstractions)
1. `Container()` - 26 edges
2. `compilerOptions` - 16 edges
3. `cn()` - 8 edges
4. `main()` - 7 edges
5. `Button` - 7 edges
6. `scripts` - 6 edges
7. `loopsAPI()` - 6 edges
8. `main()` - 5 edges
9. `include` - 5 edges
10. `siteConfig` - 4 edges

## Surprising Connections (you probably didn't know these)
- `SESSION NOTES` --references--> `Athyna Insight Secondary Logo`  [EXTRACTED]
  SESSION_NOTES.md → public/images/brand/Athyna Insight_Secondary Logo_TransparentBG.png
- `Deploy Athyna Website Workflow` --calls--> `Google Cloud Run`  [EXTRACTED]
  .github/workflows/deploy.yml → AGENTS.md
- `ServicesGrid()` --calls--> `cn()`  [EXTRACTED]
  src/components/sections/services-grid.tsx → src/lib/utils.ts
- `Why Expert Validation is the Secret Weapon of Successful AI Systems` --conceptually_related_to--> `The Building Code AI Revolution`  [INFERRED]
  src/content/blog/0009-expert-validation-ai-systems.md → src/content/blog/0008-building-code-ai-revolution.md
- `The $500 Billion Regulatory Technology Revolution` --conceptually_related_to--> `Why Expert Validation is the Secret Weapon of Successful AI Systems`  [INFERRED]
  src/content/blog/0010-regulatory-ai-market-transformation.md → src/content/blog/0009-expert-validation-ai-systems.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Lead Capture Flow** — src_components_sections_lead_capture, src_app_api_loops_capture_route, loops_so [EXTRACTED 1.00]
- **GCP Deployment Infrastructure** — github_workflows_deploy_yml, google_cloud_run, deployment_md [EXTRACTED 0.90]
- **Regulatory AI Compliance Framework** — src_content_blog_0008_building_code_ai_revolution, src_content_blog_0009_expert_validation_ai_systems, src_content_blog_0010_regulatory_ai_market_transformation [EXTRACTED 0.95]
- **Agentic AI Development Pattern** — src_content_blog_0003_from_frustrated_to_flourishing, src_content_blog_0004_building_with_ai, src_content_blog_0005_saas_is_dead [EXTRACTED 0.90]

## Communities (34 total, 17 thin omitted)

### Community 0 - "Page Layout Components"
Cohesion: 0.05
Nodes (25): metadata, SECTION_IDS, SectionId, SECTION_IDS, SectionId, SECTION_IDS, SectionId, metadata (+17 more)

### Community 1 - "Development Tooling Config"
Cohesion: 0.06
Nodes (35): autoprefixer, dotenv, eslint, eslint-config-next, @eslint/eslintrc, @next/eslint-plugin-next, devDependencies, autoprefixer (+27 more)

### Community 2 - "UI Header and Banner"
Cohesion: 0.09
Nodes (20): NavItemWithChildren, NewsletterBanner(), BlogPost, CTA(), getAllPosts(), getPostMetadata(), stats, Button (+12 more)

### Community 3 - "TypeScript Configuration"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, ./src/*, **/*.ts (+20 more)

### Community 4 - "Frontend Library Dependencies"
Cohesion: 0.07
Nodes (27): class-variance-authority, clsx, framer-motion, lucide-react, next, dependencies, class-variance-authority, clsx (+19 more)

### Community 5 - "Project Documentation and Setup"
Cohesion: 0.11
Nodes (11): Loops Email Setup Guide, Deploy Athyna Website Workflow, Google Cloud Run, Loops.so, Athyna Insight Secondary Logo, SESSION NOTES, metadata, LeadCapture() (+3 more)

### Community 6 - "Blog System Logic"
Cohesion: 0.23
Nodes (10): BlogPage(), BlogPost, getAllPosts(), getPostMetadata(), metadata, BlogPost, getPost(), PageProps (+2 more)

### Community 7 - "Global Layout and Navigation"
Cohesion: 0.20
Nodes (6): inter, metadata, RootLayoutProps, SimpleFooter(), NavLinkProps, SimpleHeader()

### Community 8 - "Project Scripts and Metadata"
Cohesion: 0.18
Nodes (10): description, name, private, scripts, build, dev, lint, start (+2 more)

### Community 9 - "Loops Email API Integration"
Cohesion: 0.38
Nodes (10): createAutomations(), createSegments(), createWelcomeEmail(), getAccountInfo(), loopsAPI(), LoopsResponse, main(), setupCustomFields() (+2 more)

### Community 10 - "Interactive Page Components"
Cohesion: 0.38
Nodes (3): ClientOnly(), ParallaxBanner(), ParallaxBannerProps

### Community 11 - "Loops API Testing Utilities"
Cohesion: 0.60
Nodes (5): createTestContact(), main(), printSetupInstructions(), sendTestEvent(), testLoopsAPI()

### Community 12 - "ESLint Configuration"
Cohesion: 0.40
Nodes (4): compat, __dirname, eslintConfig, __filename

### Community 13 - "AI Development Articles"
Cohesion: 0.50
Nodes (4): Cursor AI, Building with AI: Creating a Professional Website Without Writing Code, SaaS is Dead: The Rise of AI Agents and the End of Clunky Interfaces, Vercel

### Community 14 - "AI Industry Analysis"
Cohesion: 0.83
Nodes (4): Inplico, The Building Code AI Revolution, Why Expert Validation is the Secret Weapon of Successful AI Systems, The $500 Billion Regulatory Technology Revolution

### Community 15 - "AI Automation Case Studies"
Cohesion: 0.67
Nodes (3): Azure Logic Apps, Dify.ai, How AI Transformed a Client's Team Communication

## Knowledge Gaps
- **132 isolated node(s):** `deploy.sh script`, `__filename`, `__dirname`, `compat`, `eslintConfig` (+127 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Container()` connect `Page Layout Components` to `UI Header and Banner`, `Project Documentation and Setup`, `Blog System Logic`, `Global Layout and Navigation`, `Interactive Page Components`?**
  _High betweenness centrality (0.077) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Development Tooling Config` to `Project Scripts and Metadata`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Frontend Library Dependencies` to `Project Scripts and Metadata`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `__filename`, `__dirname` to the rest of the system?**
  _132 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Page Layout Components` be split into smaller, more focused modules?**
  _Cohesion score 0.054901960784313725 - nodes in this community are weakly interconnected._
- **Should `Development Tooling Config` be split into smaller, more focused modules?**
  _Cohesion score 0.05714285714285714 - nodes in this community are weakly interconnected._
- **Should `UI Header and Banner` be split into smaller, more focused modules?**
  _Cohesion score 0.0907258064516129 - nodes in this community are weakly interconnected._