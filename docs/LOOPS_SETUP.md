# Loops Email Setup - Quick Start Guide

This guide will get your email collection working in **5 minutes**.

## Prerequisites
- [x] Loops account created at https://loops.so
- [x] DNS records configured (already done via terraform)
- [x] API key in GitHub Secrets (already done)

## Step 1: Get Your API Key (If Not Already Done)

1. Go to https://app.loops.so/settings?page=api
2. Click "Generate key"
3. It's already in GitHub Secrets as `LOOPS_API_KEY`

## Step 2: Create Custom Properties (2 minutes)

Go to https://app.loops.so/audience/properties and add these 3 properties:

| Property Name | Type | Description |
|--------------|------|-------------|
| `userType` | Text | User segment (building-code-expert, real-estate, construction) |
| `company` | Text | Company name |
| `signupDate` | Date | When they signed up |

**How to add each property:**
1. Click "Add property"
2. Enter the property name exactly as shown above
3. Select the type
4. Click "Save"

## Step 3: Create One Welcome Email (3 minutes)

Go to https://app.loops.so/transactional and create ONE transactional email:

### Email Details:
- **Name**: `welcome_email`
- **Subject**: `Welcome to Athyna Insight - Building Code AI for Edmonton`
- **From Name**: `Athyna Insight`
- **From Email**: `hello@envelope.athynainsight.ai`
- **Reply To**: `maple@athynainsight.ai`

### Email Template (Copy & Paste This):

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
      <p>The Only Building Code AI You Can Trust</p>
    </div>
    
    <div class="content">
      <p style="font-size: 18px;">Hi {{firstName | default: "there"}},</p>
      
      <p>Thank you for joining Athyna Insight! You're now part of an exclusive group getting early access to <strong>Edmonton's first AI-powered building code assistant</strong>.</p>
      
      <div class="stats">
        <p style="margin: 0;"><strong>🚀 What We're Building:</strong></p>
        <div class="stats-grid">
          <div class="stat">
            <div class="stat-value">&lt;2 sec</div>
            <div class="stat-label">Response Time</div>
          </div>
          <div class="stat">
            <div class="stat-value">100%</div>
            <div class="stat-label">Expert Validated</div>
          </div>
          <div class="stat">
            <div class="stat-value">650+</div>
            <div class="stat-label">Pages Indexed</div>
          </div>
          <div class="stat">
            <div class="stat-value">ABC 2023</div>
            <div class="stat-label">Latest Code</div>
          </div>
        </div>
      </div>
      
      <h2>📅 What's Next?</h2>
      
      <p>We're launching our beta in <strong>4-6 weeks</strong>. As an early member, you'll get:</p>
      
      <ul>
        <li><strong>First Access</strong> - Be the first to try our AI assistant</li>
        <li><strong>Founding Member Pricing</strong> - Special rates locked in forever</li>
        <li><strong>Direct Input</strong> - Your feedback shapes the product</li>
        <li><strong>Expert Network</strong> - Connect with building code professionals</li>
      </ul>
      
      <h2>🎯 How It Works</h2>
      
      <p>Simply ask questions in plain English and get instant, accurate answers:</p>
      
      <ul>
        <li>"What are the setback requirements for RS-1 zoning?"</li>
        <li>"Can I add a secondary suite to this property?"</li>
        <li>"What fire separation is needed between these occupancies?"</li>
        <li>"Show me the egress requirements for assembly buildings"</li>
      </ul>
      
      <p>Every answer includes <strong>direct references</strong> to the Alberta Building Code 2023 and Edmonton Zoning Bylaw, so you can verify and trust the information.</p>
      
      <div style="text-align: center;">
        <a href="https://athynainsight.ai" class="button">Visit Our Website</a>
      </div>
      
      <h2>💬 We Want to Hear From You</h2>
      
      <p>What building code questions do you deal with most often? What would make your work easier? Just reply to this email - I personally read every response.</p>
      
      <p>Welcome aboard!</p>
      
      <p><strong>Maple Rose Furigay</strong><br>
      CEO & Co-Founder, Athyna Insight<br>
      <em>National Research Council Task Group Member</em><br>
      <em>15+ Years Building Code Expertise</em></p>
    </div>
    
    <div class="footer">
      <p><strong>Athyna Insight Inc.</strong><br>
      Building Code AI for Edmonton's Construction Industry<br>
      Edmonton, Alberta, Canada</p>
      
      <p style="margin-top: 20px;">
        <a href="https://athynainsight.ai">Website</a> • 
        <a href="mailto:hello@athynainsight.ai">Contact</a> • 
        <a href="{{{ unsubscribe_link }}}">Unsubscribe</a>
      </p>
      
      <p style="margin-top: 20px; font-size: 12px; color: #9ca3af;">
        © 2024 Athyna Insight Inc. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>
```

### Plain Text Version (Also Add This):

```
Welcome to Athyna Insight!

Hi {{firstName | default: "there"}},

Thank you for joining Athyna Insight! You're now part of an exclusive group getting early access to Edmonton's first AI-powered building code assistant.

🚀 WHAT WE'RE BUILDING:
• <2 second response time
• 100% expert validated answers
• 650+ pages of building code indexed
• Alberta Building Code 2023 (latest version)

📅 WHAT'S NEXT?

We're launching our beta in 4-6 weeks. As an early member, you'll get:
• First Access - Be the first to try our AI assistant
• Founding Member Pricing - Special rates locked in forever
• Direct Input - Your feedback shapes the product
• Expert Network - Connect with building code professionals

🎯 HOW IT WORKS

Simply ask questions in plain English:
• "What are the setback requirements for RS-1 zoning?"
• "Can I add a secondary suite to this property?"
• "What fire separation is needed between these occupancies?"
• "Show me the egress requirements for assembly buildings"

Every answer includes direct references to the Alberta Building Code 2023 and Edmonton Zoning Bylaw.

💬 WE WANT TO HEAR FROM YOU

What building code questions do you deal with most often? What would make your work easier? Just reply to this email - I personally read every response.

Welcome aboard!

Maple Rose Furigay
CEO & Co-Founder, Athyna Insight
National Research Council Task Group Member
15+ Years Building Code Expertise

---
Visit our website: https://athynainsight.ai
Unsubscribe: {{{ unsubscribe_link }}}

© 2024 Athyna Insight Inc. All rights reserved.
```

## Step 4: Get the Transactional ID

After creating the email:
1. Click on your new `welcome_email` transactional
2. Copy the Transactional ID (looks like: `clh0x3...`)
3. Save it for the next step

## Step 5: Create an Automation (1 minute)

Go to https://app.loops.so/automations and create a new automation:

1. **Name**: "Welcome Email on Signup"
2. **Trigger**: Select "Event received"
3. **Event Name**: `signup_completed`
4. **Action**: "Send transactional email"
5. **Select Email**: Choose your `welcome_email`
6. **Activate** the automation

## Step 6: Update Your API Endpoint

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