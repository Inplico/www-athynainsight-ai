#!/usr/bin/env npx tsx

/**
 * Loops Configuration Helper
 * Run with: npx tsx scripts/setup-loops-simplified.ts
 * 
 * This script tests the Loops API and provides setup instructions
 */

import { config } from 'dotenv';
config();

const LOOPS_API_KEY = process.env.LOOPS_API_KEY;

// Test API connectivity and list existing configuration
async function testLoopsAPI() {
  console.log('🔍 Testing Loops API Connection...\n');
  
  // Test 1: List existing mailing lists
  try {
    console.log('📋 Fetching existing mailing lists...');
    const response = await fetch('https://app.loops.so/api/v1/lists', {
      headers: {
        'Authorization': `Bearer ${LOOPS_API_KEY}`,
      },
    });
    
    if (response.ok) {
      const lists = await response.json();
      console.log('✅ API connection successful!');
      console.log(`Found ${lists.length} mailing lists:`);
      lists.forEach((list: any) => {
        console.log(`  - ${list.name} (ID: ${list.id})`);
      });
    } else {
      console.log('❌ Failed to fetch lists:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('❌ API connection failed:', error);
  }
}

// Create a test contact
async function createTestContact() {
  console.log('\n📧 Creating test contact...');
  
  const testContact = {
    email: 'test@athynainsight.ai',
    firstName: 'Test',
    lastName: 'User',
    source: 'api_test',
    userGroup: 'building-code-expert',
    company: 'Athyna Insight Test',
    companySize: '10-50 employees',
    userType: 'building-code-expert',
    signupDate: new Date().toISOString(),
  };

  try {
    const response = await fetch('https://app.loops.so/api/v1/contacts/create', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOOPS_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testContact),
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Test contact created successfully!');
      console.log('Response:', result);
    } else {
      console.log('⚠️ Contact creation failed:', result);
      if (response.status === 409) {
        console.log('   (Contact already exists - this is OK)');
      }
    }
  } catch (error) {
    console.error('❌ Failed to create contact:', error);
  }
}

// Send a test event
async function sendTestEvent() {
  console.log('\n📨 Sending test event...');
  
  const eventData = {
    email: 'test@athynainsight.ai',
    eventName: 'signup_completed',
    eventProperties: {
      source: 'website',
      userType: 'building-code-expert',
      timestamp: new Date().toISOString(),
    },
  };

  try {
    const response = await fetch('https://app.loops.so/api/v1/events/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOOPS_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Event sent successfully!');
      console.log('Response:', result);
    } else {
      console.log('⚠️ Event send failed:', result);
    }
  } catch (error) {
    console.error('❌ Failed to send event:', error);
  }
}

// Print setup instructions
function printSetupInstructions() {
  console.log('\n' + '='.repeat(60));
  console.log('📝 LOOPS SETUP INSTRUCTIONS');
  console.log('='.repeat(60));
  
  console.log('\n1️⃣  CREATE MAILING LISTS (in Loops Dashboard):');
  console.log('   Go to: https://app.loops.so/audience/lists');
  console.log('   Create these lists:');
  console.log('   • building_code_experts - "Building code experts and validators"');
  console.log('   • real_estate_professionals - "Real estate agents and brokers"');
  console.log('   • construction_companies - "Construction companies and contractors"');
  console.log('   • early_access - "Beta testers and early adopters"');
  
  console.log('\n2️⃣  CREATE CUSTOM PROPERTIES (in Loops Dashboard):');
  console.log('   Go to: https://app.loops.so/audience/properties');
  console.log('   Add these properties:');
  console.log('   • company (Text) - Company name');
  console.log('   • companySize (Text) - Company size range');
  console.log('   • userType (Text) - User category');
  console.log('   • signupDate (Date) - Signup timestamp');
  console.log('   • leadScore (Number) - Lead quality score');
  
  console.log('\n3️⃣  CREATE TRANSACTIONAL EMAILS (in Loops Dashboard):');
  console.log('   Go to: https://app.loops.so/transactional');
  console.log('   Create welcome emails for each audience:');
  console.log('   • welcome_experts - For building code experts');
  console.log('   • welcome_realestate - For real estate professionals');
  console.log('   • welcome_construction - For construction companies');
  
  console.log('\n4️⃣  SET UP AUTOMATIONS (in Loops Dashboard):');
  console.log('   Go to: https://app.loops.so/automations');
  console.log('   Create these automations:');
  console.log('   • Trigger: Contact added to list → Send welcome email');
  console.log('   • Trigger: Event "signup_completed" → Add to appropriate list');
  
  console.log('\n5️⃣  UPDATE API ENDPOINT (in your code):');
  console.log('   The lead capture form endpoint is already configured at:');
  console.log('   /api/loops-capture');
  console.log('   It will automatically segment users based on their selection');
  
  console.log('\n6️⃣  VERIFY DNS RECORDS:');
  console.log('   Check that all DNS records are properly configured:');
  console.log('   • MX: envelope.athynainsight.ai');
  console.log('   • SPF: TXT record with SPF data');
  console.log('   • DKIM: 3 CNAME records for signing');
  
  console.log('\n' + '='.repeat(60));
  console.log('🎯 QUICK WINS');
  console.log('='.repeat(60));
  
  console.log('\n• Start Simple: Begin with a single welcome email');
  console.log('• Test First: Use your own email to test the flow');
  console.log('• Monitor: Check open rates and engagement');
  console.log('• Iterate: Improve based on user feedback');
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 RECOMMENDED SEGMENTS');
  console.log('='.repeat(60));
  
  console.log('\n• High-Value: leadScore > 70');
  console.log('• Enterprise: companySize contains "100+"');
  console.log('• Active: Last activity < 7 days');
  console.log('• Edmonton: Location = "Edmonton"');
  console.log('• Engaged Experts: Opens > 3 AND userType = "expert"');
}

// Main function
async function main() {
  console.log('🚀 Loops Configuration Helper for Athyna Insight\n');
  console.log('API Key:', LOOPS_API_KEY ? '✅ Configured' : '❌ Missing');
  
  if (!LOOPS_API_KEY) {
    console.error('\n❌ Please set LOOPS_API_KEY in your .env file');
    process.exit(1);
  }

  // Run tests
  await testLoopsAPI();
  await createTestContact();
  await sendTestEvent();
  
  // Print instructions
  printSetupInstructions();
  
  console.log('\n✨ Configuration helper complete!');
  console.log('📌 Next: Follow the setup instructions above in your Loops dashboard');
  console.log('🔗 Dashboard: https://app.loops.so\n');
}

// Run the script
main().catch(console.error);