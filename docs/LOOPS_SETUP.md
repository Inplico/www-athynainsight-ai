# Loops Email Setup - Quick Start Guide

This guide will get your email collection working in **3 minutes**.

## What's Already Done ✅
- DNS records configured (MX, SPF, DKIM)
- API key in GitHub Secrets
- API endpoint ready at `/api/loops-capture`
- Using built-in Loops fields (no custom properties needed!)

## Data We're Collecting

| Field | Description | Example |
|-------|-------------|---------|
| `email` | Email address | user@example.com |
| `firstName` / `lastName` | Parsed from name field | John Doe |
| `company` | Company name | ABC Construction |
| `userGroup` | User type for segmentation | `building-code-expert`, `real-estate`, or `construction` |
| `source` | Where they signed up | `athynainsight.ai` |
| `createdAt` | Signup timestamp | Automatically set by Loops |

## Step 1: Choose Your Welcome Email Approach

### Option A: Loop (Automation) - RECOMMENDED
**Best for welcome emails that trigger automatically when someone joins**

1. Go to https://app.loops.so/loop-builder
2. Click "Create a new loop"
3. Set trigger: **"Contact added"** (this triggers when contacts join via API/form)
4. Add an email step with the template below
5. Optionally add filters by userGroup (expert, realEstate, construction)
6. Activate the loop
7. Remove the transactional email code from `/api/loops-capture/route.ts` (lines 56-78)

**Note**: The "Contact added" trigger works for contacts added via API, forms, or integrations. It does NOT trigger for CSV uploads or manual additions.

### Option B: Keep Current Transactional Setup
Your code currently sends a transactional email via API. This works but requires maintaining the email trigger in your code.

To update the transactional email, go to https://app.loops.so/transactional:

### Email Details:
- **Name**: `welcome_email`
- **Subject**: `Welcome to Athyna Insight!`
- **From Name**: `Athyna Insight`
- **From Email**: `hello@envelope.athynainsight.ai`
- **Reply To**: `maple@athynainsight.ai`

### Email Template (Copy & Paste This):

**For Campaign Email (Recommended):**
- Use `{{contact.firstName | default: "there"}}` for the greeting
- This pulls from contact properties stored in Loops

**For Transactional Email:**
- Use `{{firstName}}` (data comes from API call)
- Set fallback in Loops dashboard

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #1f2937;
      margin: 0;
      padding: 0;
      background-color: #f9fafb;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: white;
    }
    .header {
      background: linear-gradient(135deg, #f97316 0%, #fb923c 100%);
      color: white;
      padding: 40px 30px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
    }
    .header p {
      margin: 10px 0 0 0;
      opacity: 0.95;
      font-size: 16px;
    }
    .content {
      padding: 40px 30px;
    }
    .content h2 {
      color: #f97316;
      font-size: 20px;
      margin-top: 30px;
      margin-bottom: 15px;
    }
    .button {
      display: inline-block;
      padding: 14px 28px;
      background: #f97316;
      color: white !important;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 600;
      margin: 25px 0;
    }
    .stats {
      background: #fef3c7;
      border-left: 4px solid #f97316;
      padding: 20px;
      margin: 25px 0;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin-top: 15px;
    }
    .stat {
      text-align: center;
    }
    .stat-value {
      font-size: 24px;
      font-weight: bold;
      color: #f97316;
    }
    .stat-label {
      font-size: 12px;
      color: #92400e;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    ul {
      padding-left: 20px;
      color: #4b5563;
    }
    li {
      margin-bottom: 10px;
    }
    .footer {
      background: #f9fafb;
      padding: 30px;
      text-align: center;
      color: #6b7280;
      font-size: 14px;
      border-top: 1px solid #e5e7eb;
    }
    .footer a {
      color: #f97316;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to Athyna Insight!</h1>
      <p>AI You Can Trust for Every Building Code Decision</p>
    </div>
    
    <div class="content">
      <p style="font-size: 18px;">Hi {{contact.firstName | default: "there"}},</p>
      
      <p>Thank you for joining us! You're now part of an exclusive group getting early access to <strong>Alberta's first AI-powered building code assistant</strong>.</p>
      
      <div class="stats">
        <p style="margin: 0;"><strong>🚀 What We're Building:</strong></p>
        <div class="stats-grid">
          <div class="stat">
            <div class="stat-value">70%</div>
            <div class="stat-label">Time Saved</div>
          </div>
          <div class="stat">
            <div class="stat-value">95%+</div>
            <div class="stat-label">Expert Validated</div>
          </div>
          <div class="stat">
            <div class="stat-value">3</div>
            <div class="stat-label">Regulatory Frameworks</div>
          </div>
          <div class="stat">
            <div class="stat-value">NBC 2023</div>
            <div class="stat-label">Alberta Edition</div>
          </div>
        </div>
      </div>
      
      <h2>📅 What's Next?</h2>
      
      <p>We're launching our beta this <strong>October</strong>. As an early member, you'll get:</p>
      
      <ul>
        <li><strong>Priority Access</strong> - Be the first to explore our AI assistant</li>
        <li><strong>Founding Member Pricing</strong> – Locked-in rates that never expire</li>
        <li><strong>Shaping the Future</strong> – Your insights will directly guide our product development</li>
        <li><strong>Expert Network</strong> - Connect with compliance professionals and industry innovators</li>
      </ul>
      
      <h2>🎯 How It Works</h2>
      
      <p>Forget the jargon! Type in an address and ask questions in plain English – get instant, accurate answers:</p>
      
      <ul>
        <li>"Is this property zoned for a mixed-use development?"</li>
        <li>"Can I add a secondary suite to a duplex?"</li>
        <li>"What fire separation is needed between a daycare and a coffee shop?"</li>
        <li>"Show me the egress requirements for a restaurant."</li>
      </ul>
      
      <p>Each response includes <strong>direct references</strong> to the NBC – 2023 Alberta Edition and local Zoning Bylaws, so you can verify and trust the information.</p>
      
      <div style="text-align: center;">
        <a href="https://athynainsight.ai" class="button">Visit Our Website</a>
      </div>
      
      <h2>💬 We Want to Hear From You</h2>
      
      <p>What would make your work easier? What Code or Bylaw questions come up the most? Just reply to this email - I personally read every response.</p>
      
      <p>Welcome aboard!</p>
      
      <p><strong>Maple Rose Furigay, PMP®</strong><br>
      CEO & Co-Founder, Athyna Insight<br>
      <em>National Research Council Task Group Member</em><br>
      <em>15+ Years Building Code Expertise</em></p>
    </div>
    
    <div class="footer">
      <p><strong>Athyna Insight Inc.</strong><br>
      Building Code AI for Alberta's Construction Industry<br>
      Edmonton, Alberta, Canada</p>
      
      <p style="margin-top: 20px;">
        <a href="https://athynainsight.ai">Website</a> • 
        <a href="mailto:hello@athynainsight.ai">Contact</a> • 
        <a href="{{unsubscribe_link}}">Unsubscribe</a>
      </p>
      
      <p style="margin-top: 20px; font-size: 12px; color: #9ca3af;">
        © 2025 Athyna Insight Inc. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>
```

### Plain Text Version (Also Add This):

```
Welcome to Athyna Insight!

Hi {{contact.firstName | default: "there"}},

Thank you for joining us! You're now part of an exclusive group getting early access to Alberta's first AI-powered building code assistant.

🚀 WHAT WE'RE BUILDING:
• 70% time saved on compliance
• 95%+ expert validated answers
• 3 regulatory frameworks
• NBC 2023 Alberta Edition

📅 WHAT'S NEXT?

We're launching our beta this October. As an early member, you'll get:
• Priority Access - Be the first to explore our AI assistant
• Founding Member Pricing – Locked-in rates that never expire
• Shaping the Future – Your insights will directly guide our product development
• Expert Network - Connect with compliance professionals and industry innovators

🎯 HOW IT WORKS

Forget the jargon! Type in an address and ask questions in plain English – get instant, accurate answers:
• "Is this property zoned for a mixed-use development?"
• "Can I add a secondary suite to a duplex?"
• "What fire separation is needed between a daycare and a coffee shop?"
• "Show me the egress requirements for a restaurant."

Each response includes direct references to the NBC – 2023 Alberta Edition and local Zoning Bylaws.

💬 WE WANT TO HEAR FROM YOU

What would make your work easier? What Code or Bylaw questions come up the most? Just reply to this email - I personally read every response.

Welcome aboard!

Maple Rose Furigay, PMP®
CEO & Co-Founder, Athyna Insight
National Research Council Task Group Member
15+ Years Building Code Expertise

---
Visit our website: https://athynainsight.ai
Unsubscribe: {{unsubscribe_link}}

© 2025 Athyna Insight Inc. All rights reserved.
```

## Step 2: Get the Transactional ID

After creating the email:
1. Click on your new `welcome_email` transactional
2. Copy the Transactional ID (looks like: `clh0x3...`)
3. Save it for the next step

## Step 3: Update Your API Endpoint

Edit `/src/app/api/loops-capture/route.ts` and replace `YOUR_TRANSACTIONAL_ID_HERE` with your actual ID:

```typescript
// Line 63 in the file
const WELCOME_EMAIL_ID = 'YOUR_TRANSACTIONAL_ID_HERE'; // <-- Replace with your actual ID
```

For example, if your transactional ID is `clh0x3abc123`, change it to:
```typescript
const WELCOME_EMAIL_ID = 'clh0x3abc123';
```

## That's It! 🎉

Your email system is now live. When someone fills out the form on your website:
1. They're added to Loops as a contact
2. They receive your welcome email immediately
3. You can see them in your Loops dashboard

## Testing Your Setup

1. Go to your website's lead capture form
2. Enter a test email
3. Check that you receive the welcome email
4. Verify the contact appears in Loops dashboard

## Optional: Segment Your Audience Later

Once you have some contacts, you can create segments in Loops based on:
- `userType` (building-code-expert, real-estate, construction)
- Engagement (who opened emails)
- Sign up date
- Company name

## Need Help?

- Loops Documentation: https://loops.so/docs
- Loops Support: support@loops.so
- Your Dashboard: https://app.loops.so