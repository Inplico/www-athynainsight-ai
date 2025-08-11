#!/usr/bin/env npx tsx

/**
 * Loops Setup Script
 * Run with: npx tsx scripts/setup-loops.ts
 * 
 * This script helps configure Loops email marketing for Athyna Insight
 * Note: Some features (lists, transactional templates) must be created in the Loops UI first
 */

import { config } from 'dotenv';
config();

const LOOPS_API_KEY = process.env.LOOPS_API_KEY;
const LOOPS_API_BASE = 'https://app.loops.so/api';

interface LoopsResponse {
  success: boolean;
  data?: any;
  error?: string;
}

async function loopsAPI(endpoint: string, method: string = 'GET', body?: any): Promise<LoopsResponse> {
  const url = `${LOOPS_API_BASE}${endpoint}`;
  const options: RequestInit = {
    method,
    headers: {
      'Authorization': `Bearer ${LOOPS_API_KEY}`,
      'Content-Type': 'application/json',
    },
  };

  if (body && method !== 'GET') {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    
    if (!response.ok) {
      console.error(`API Error: ${response.status}`, data);
      return { success: false, error: data.message || 'API request failed' };
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('Request failed:', error);
    return { success: false, error: String(error) };
  }
}

async function setupCustomFields() {
  console.log('\n📋 Setting up custom fields...');
  
  const customFields = [
    { key: 'company', label: 'Company', type: 'string' },
    { key: 'companySize', label: 'Company Size', type: 'string' },
    { key: 'userType', label: 'User Type', type: 'string' },
    { key: 'signupDate', label: 'Signup Date', type: 'date' },
    { key: 'leadScore', label: 'Lead Score', type: 'number' },
    { key: 'lastEngagement', label: 'Last Engagement', type: 'date' },
  ];

  for (const field of customFields) {
    console.log(`  - Creating field: ${field.label}`);
    const result = await loopsAPI('/custom-fields', 'POST', field);
    if (result.success) {
      console.log(`    ✅ Created: ${field.key}`);
    } else if (result.error?.includes('already exists')) {
      console.log(`    ℹ️  Already exists: ${field.key}`);
    } else {
      console.log(`    ❌ Failed: ${result.error}`);
    }
  }
}

async function setupMailingLists() {
  console.log('\n📬 Setting up mailing lists...');
  
  const lists = [
    { 
      name: 'building_code_experts',
      description: 'Building code experts, architects, and city officials'
    },
    { 
      name: 'real_estate_professionals',
      description: 'Real estate professionals and property developers'
    },
    { 
      name: 'construction_companies',
      description: 'Construction companies and contractors'
    },
    { 
      name: 'general',
      description: 'General newsletter subscribers'
    },
    { 
      name: 'early_access',
      description: 'Early access and beta testers'
    }
  ];

  for (const list of lists) {
    console.log(`  - Creating list: ${list.name}`);
    const result = await loopsAPI('/lists', 'POST', list);
    if (result.success) {
      console.log(`    ✅ Created: ${list.name}`);
    } else if (result.error?.includes('already exists')) {
      console.log(`    ℹ️  Already exists: ${list.name}`);
    } else {
      console.log(`    ❌ Failed: ${result.error}`);
    }
  }
}

async function createWelcomeEmail() {
  console.log('\n✉️  Creating welcome email templates...');

  const welcomeEmails = [
    {
      name: 'welcome_building_experts',
      subject: 'Welcome to Athyna Insight - Your Building Code AI Assistant',
      fromName: 'Maple Rose',
      fromEmail: 'maple@envelope.athynainsight.ai',
      replyEmail: 'maple@athynainsight.ai',
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #f97316 0%, #fb923c 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
    .content { background: white; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 8px 8px; }
    .button { display: inline-block; padding: 12px 24px; background: #f97316; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
    .footer { text-align: center; color: #6b7280; font-size: 14px; margin-top: 30px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to Athyna Insight!</h1>
      <p>The Only Building Code AI You Can Trust</p>
    </div>
    <div class="content">
      <p>Hi {{firstName}},</p>
      
      <p>Thank you for joining Athyna Insight as a building code expert! Your expertise is invaluable in helping us create the most accurate and reliable building code AI assistant.</p>
      
      <h2>🎯 What's Next?</h2>
      <ul>
        <li><strong>Early Access:</strong> You'll be among the first to test our AI assistant</li>
        <li><strong>Expert Validation:</strong> Help validate AI responses for accuracy</li>
        <li><strong>Shape the Product:</strong> Your feedback will directly influence our development</li>
      </ul>
      
      <h2>🚀 Coming Soon</h2>
      <p>We're launching our beta in the next 4-6 weeks. Here's what to expect:</p>
      <ul>
        <li>Natural language building code queries</li>
        <li>Edmonton zoning integration</li>
        <li>Expert-validated responses</li>
        <li>Direct references to code sections</li>
      </ul>
      
      <a href="https://athynainsight.ai" class="button">Visit Our Website</a>
      
      <p>Have questions or want to share your thoughts? Just reply to this email - I personally read every response.</p>
      
      <p>Best regards,<br>
      Maple Rose Furigay<br>
      CEO & Co-Founder, Athyna Insight<br>
      <em>National Research Council Task Group Member</em></p>
    </div>
    <div class="footer">
      <p>© 2024 Athyna Insight Inc. | Edmonton, Alberta, Canada</p>
      <p><a href="{{{ unsubscribe_link }}}">Unsubscribe</a></p>
    </div>
  </div>
</body>
</html>
      `,
      text: `
Welcome to Athyna Insight!

Hi {{firstName}},

Thank you for joining Athyna Insight as a building code expert! Your expertise is invaluable in helping us create the most accurate and reliable building code AI assistant.

What's Next?
- Early Access: You'll be among the first to test our AI assistant
- Expert Validation: Help validate AI responses for accuracy
- Shape the Product: Your feedback will directly influence our development

Coming Soon:
We're launching our beta in the next 4-6 weeks. Here's what to expect:
- Natural language building code queries
- Edmonton zoning integration
- Expert-validated responses
- Direct references to code sections

Have questions? Just reply to this email - I personally read every response.

Best regards,
Maple Rose Furigay
CEO & Co-Founder, Athyna Insight
National Research Council Task Group Member

© 2024 Athyna Insight Inc.
Unsubscribe: {{{ unsubscribe_link }}}
      `,
      mailingLists: ['building_code_experts']
    },
    {
      name: 'welcome_real_estate',
      subject: 'Welcome to Athyna Insight - Simplifying Building Compliance',
      fromName: 'Athyna Insight Team',
      fromEmail: 'team@envelope.athynainsight.ai',
      replyEmail: 'hello@athynainsight.ai',
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #f97316 0%, #fb923c 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
    .content { background: white; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 8px 8px; }
    .button { display: inline-block; padding: 12px 24px; background: #f97316; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
    .footer { text-align: center; color: #6b7280; font-size: 14px; margin-top: 30px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to Athyna Insight!</h1>
      <p>Building Code Compliance Made Simple</p>
    </div>
    <div class="content">
      <p>Hi {{firstName}},</p>
      
      <p>Welcome to Athyna Insight! We're revolutionizing how real estate professionals navigate building codes and zoning regulations.</p>
      
      <h2>💡 Why Athyna Insight?</h2>
      <ul>
        <li><strong>Save Time:</strong> Get instant answers instead of searching through 600+ page documents</li>
        <li><strong>Reduce Risk:</strong> Expert-validated responses you can trust</li>
        <li><strong>Close Deals Faster:</strong> Quickly verify property compliance and permitted uses</li>
      </ul>
      
      <h2>🏗️ Perfect for Real Estate</h2>
      <p>Our AI assistant helps you:</p>
      <ul>
        <li>Verify zoning and permitted uses instantly</li>
        <li>Understand building code requirements</li>
        <li>Assess renovation feasibility</li>
        <li>Answer client questions with confidence</li>
      </ul>
      
      <a href="https://athynainsight.ai" class="button">Learn More</a>
      
      <p>We're launching soon in Edmonton with plans to expand across Alberta. Stay tuned for updates!</p>
      
      <p>Best regards,<br>
      The Athyna Insight Team</p>
    </div>
    <div class="footer">
      <p>© 2024 Athyna Insight Inc. | Edmonton, Alberta, Canada</p>
      <p><a href="{{{ unsubscribe_link }}}">Unsubscribe</a></p>
    </div>
  </div>
</body>
</html>
      `,
      text: `
Welcome to Athyna Insight!

Hi {{firstName}},

Welcome to Athyna Insight! We're revolutionizing how real estate professionals navigate building codes and zoning regulations.

Why Athyna Insight?
- Save Time: Get instant answers instead of searching through 600+ page documents
- Reduce Risk: Expert-validated responses you can trust
- Close Deals Faster: Quickly verify property compliance and permitted uses

Perfect for Real Estate:
Our AI assistant helps you:
- Verify zoning and permitted uses instantly
- Understand building code requirements
- Assess renovation feasibility
- Answer client questions with confidence

We're launching soon in Edmonton with plans to expand across Alberta. Stay tuned!

Best regards,
The Athyna Insight Team

© 2024 Athyna Insight Inc.
Unsubscribe: {{{ unsubscribe_link }}}
      `,
      mailingLists: ['real_estate_professionals']
    },
    {
      name: 'welcome_construction',
      subject: 'Welcome to Athyna Insight - Your AI Building Code Assistant',
      fromName: 'Athyna Insight',
      fromEmail: 'hello@envelope.athynainsight.ai',
      replyEmail: 'support@athynainsight.ai',
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #f97316 0%, #fb923c 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
    .content { background: white; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 8px 8px; }
    .button { display: inline-block; padding: 12px 24px; background: #f97316; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
    .stat { display: inline-block; margin: 10px 20px; }
    .footer { text-align: center; color: #6b7280; font-size: 14px; margin-top: 30px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to Athyna Insight!</h1>
      <p>AI-Powered Building Code Compliance</p>
    </div>
    <div class="content">
      <p>Hi {{firstName}},</p>
      
      <p>Thank you for joining Athyna Insight! We're building the future of building code compliance for construction companies like yours.</p>
      
      <h2>🔨 Built for Construction Teams</h2>
      <p>Stop wasting hours searching through building codes. Our AI assistant gives you:</p>
      <ul>
        <li><strong>Instant Answers:</strong> Natural language queries, expert-validated responses</li>
        <li><strong>Code References:</strong> Direct links to relevant sections and pages</li>
        <li><strong>Edmonton Focus:</strong> Specialized for Alberta Building Code 2023</li>
        <li><strong>Team Access:</strong> Share knowledge across your entire team</li>
      </ul>
      
      <h2>📊 By the Numbers</h2>
      <div style="text-align: center; margin: 20px 0;">
        <div class="stat"><strong>&lt;2 sec</strong><br>Response Time</div>
        <div class="stat"><strong>100%</strong><br>Expert Validated</div>
        <div class="stat"><strong>650+</strong><br>Pages Indexed</div>
      </div>
      
      <p><strong>Coming Soon:</strong> Beta access launching in 4-6 weeks. Your team will save hours every week on code lookups and compliance checks.</p>
      
      <a href="https://athynainsight.ai" class="button">Visit Our Website</a>
      
      <p>Questions about enterprise features or team pricing? Reply to this email and let's talk!</p>
      
      <p>Best regards,<br>
      The Athyna Insight Team</p>
    </div>
    <div class="footer">
      <p>© 2024 Athyna Insight Inc. | Edmonton, Alberta, Canada</p>
      <p><a href="{{{ unsubscribe_link }}}">Unsubscribe</a></p>
    </div>
  </div>
</body>
</html>
      `,
      text: `
Welcome to Athyna Insight!

Hi {{firstName}},

Thank you for joining Athyna Insight! We're building the future of building code compliance for construction companies like yours.

Built for Construction Teams:
Stop wasting hours searching through building codes. Our AI assistant gives you:
- Instant Answers: Natural language queries, expert-validated responses
- Code References: Direct links to relevant sections and pages
- Edmonton Focus: Specialized for Alberta Building Code 2023
- Team Access: Share knowledge across your entire team

By the Numbers:
- <2 sec Response Time
- 100% Expert Validated
- 650+ Pages Indexed

Coming Soon: Beta access launching in 4-6 weeks. Your team will save hours every week!

Questions about enterprise features? Reply to this email and let's talk!

Best regards,
The Athyna Insight Team

© 2024 Athyna Insight Inc.
Unsubscribe: {{{ unsubscribe_link }}}
      `,
      mailingLists: ['construction_companies']
    }
  ];

  for (const email of welcomeEmails) {
    console.log(`  - Creating template: ${email.name}`);
    const result = await loopsAPI('/transactional', 'POST', email);
    if (result.success) {
      console.log(`    ✅ Created: ${email.name}`);
    } else {
      console.log(`    ❌ Failed: ${result.error}`);
    }
  }
}

async function createAutomations() {
  console.log('\n🤖 Setting up automations...');

  // Note: Loops API for automations might be limited
  // These are conceptual - you may need to set up in the UI
  const automations = [
    {
      name: 'Welcome Series - Building Experts',
      trigger: 'list_added',
      list: 'building_code_experts',
      description: 'Send welcome email immediately when expert joins'
    },
    {
      name: 'Welcome Series - Real Estate',
      trigger: 'list_added',
      list: 'real_estate_professionals',
      description: 'Send welcome email when real estate professional joins'
    },
    {
      name: 'Welcome Series - Construction',
      trigger: 'list_added',
      list: 'construction_companies',
      description: 'Send welcome email when construction company joins'
    },
    {
      name: 'Re-engagement Campaign',
      trigger: 'inactivity',
      days: 30,
      description: 'Re-engage users who haven\'t interacted in 30 days'
    }
  ];

  console.log('  ℹ️  Note: Automations may need to be configured in the Loops UI');
  automations.forEach(auto => {
    console.log(`  - ${auto.name}: ${auto.description}`);
  });
}

async function createSegments() {
  console.log('\n🎯 Setting up segments...');

  // Segments are typically created via UI, but documenting the strategy
  const segments = [
    {
      name: 'High-Value Leads',
      criteria: 'leadScore > 70 AND lastEngagement < 7 days'
    },
    {
      name: 'Enterprise Prospects',
      criteria: 'companySize = "50+ employees" OR companySize = "100+ employees"'
    },
    {
      name: 'Active Experts',
      criteria: 'userType = "building-code-expert" AND lastEngagement < 14 days'
    },
    {
      name: 'Edmonton Users',
      criteria: 'location = "Edmonton" OR location contains "Alberta"'
    }
  ];

  console.log('  ℹ️  Suggested segments for Loops UI configuration:');
  segments.forEach(segment => {
    console.log(`  - ${segment.name}: ${segment.criteria}`);
  });
}

async function testEmailSend() {
  console.log('\n🧪 Testing email configuration...');
  
  // Test with a sample contact
  const testContact = {
    email: 'test@athynainsight.ai', // Change to your test email
    firstName: 'Test',
    lastName: 'User',
    source: 'api_test',
    userGroup: 'building-code-expert',
    mailingLists: ['building_code_experts'],
  };

  console.log('  - Creating test contact...');
  const result = await loopsAPI('/contacts/create', 'POST', testContact);
  
  if (result.success) {
    console.log('    ✅ Test contact created successfully');
    console.log('    📧 Check your Loops dashboard to verify setup');
  } else {
    console.log('    ⚠️  Test skipped:', result.error);
  }
}

async function getAccountInfo() {
  console.log('\n📊 Account Information:');
  
  const info = await loopsAPI('/lists', 'GET');
  if (info.success) {
    console.log(`  - Mailing Lists: ${info.data?.length || 0}`);
  }

  const contacts = await loopsAPI('/contacts', 'GET');
  if (contacts.success) {
    console.log(`  - Total Contacts: ${contacts.data?.length || 0}`);
  }
}

async function main() {
  console.log('🚀 Setting up Loops for Athyna Insight\n');
  console.log('API Key:', LOOPS_API_KEY ? '✅ Configured' : '❌ Missing');
  
  if (!LOOPS_API_KEY) {
    console.error('Please set LOOPS_API_KEY in your .env file');
    process.exit(1);
  }

  try {
    // Setup in order
    await setupCustomFields();
    await setupMailingLists();
    await createWelcomeEmail();
    await createAutomations();
    await createSegments();
    await getAccountInfo();
    // await testEmailSend(); // Uncomment to test

    console.log('\n✅ Loops setup complete!');
    console.log('\n📝 Next steps:');
    console.log('  1. Log into Loops dashboard to verify configuration');
    console.log('  2. Set up automations in the UI (if needed)');
    console.log('  3. Configure segments in the UI');
    console.log('  4. Test the welcome emails');
    console.log('  5. Monitor email deliverability');
    
  } catch (error) {
    console.error('\n❌ Setup failed:', error);
    process.exit(1);
  }
}

// Run the setup
main();