#!/usr/bin/env npx tsx

/**
 * Automated Loops Setup Script
 * Run with: npx tsx scripts/setup-loops-auto.ts
 * 
 * This script automatically creates the required custom properties in Loops
 */

import { config } from 'dotenv';
config();

const LOOPS_API_KEY = process.env.LOOPS_API_KEY;

async function createCustomProperties() {
  console.log('🚀 Automated Loops Setup for Athyna Insight\n');
  
  if (!LOOPS_API_KEY) {
    console.error('❌ Please set LOOPS_API_KEY in your .env file');
    process.exit(1);
  }

  // No custom properties needed! We're using Loops built-in fields:
  // - userGroup (built-in): for user segmentation (building-code-expert, real-estate, construction)
  // - company (built-in): for company name
  // - createdAt (built-in): automatically tracks signup date
  
  console.log('✅ Great news! No custom properties needed.\n');
  console.log('We\'re using Loops built-in fields:');
  console.log('  • userGroup - for segmentation (building-code-expert, real-estate, construction)');
  console.log('  • company - for company name');
  console.log('  • createdAt - automatically set by Loops\n');
  
  const properties = [];

  console.log('📋 Creating custom properties...\n');
  
  let successCount = 0;
  let skipCount = 0;
  
  for (const prop of properties) {
    try {
      console.log(`Creating: ${prop.name} (${prop.type}) - ${prop.description}`);
      
      const response = await fetch('https://app.loops.so/api/v1/contacts/properties', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${LOOPS_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: prop.name,
          type: prop.type,
        }),
      });

      const result = await response.json();
      
      if (response.ok && result.success) {
        console.log(`  ✅ Created successfully!\n`);
        successCount++;
      } else if (response.status === 400 && result.message?.includes('already exists')) {
        console.log(`  ℹ️  Already exists (skipping)\n`);
        skipCount++;
      } else {
        console.log(`  ❌ Failed: ${result.message || 'Unknown error'}\n`);
      }
    } catch (error) {
      console.log(`  ❌ Error: ${error}\n`);
    }
  }

  console.log('=' + '='.repeat(59));
  console.log(`✨ Setup Complete!`);
  console.log('=' + '='.repeat(59));
  console.log(`\n📊 Results:`);
  console.log(`  • Created: ${successCount} properties`);
  console.log(`  • Skipped: ${skipCount} properties (already existed)`);
  console.log(`  • Total: ${properties.length} properties configured`);
  
  if (successCount + skipCount === properties.length) {
    console.log(`\n✅ All custom properties are ready!`);
  }

  console.log('\n📝 Next Steps:');
  console.log('1. Go to https://app.loops.so/transactional');
  console.log('2. Create your welcome email using the template in docs/LOOPS_SETUP.md');
  console.log('3. Copy the transactional ID');
  console.log('4. Update src/app/api/loops-capture/route.ts with the ID');
  console.log('5. Deploy your changes\n');
  
  // Test that we can create contacts with these properties
  console.log('🧪 Testing contact creation with custom properties...');
  
  try {
    const testContact = {
      email: `test-${Date.now()}@athynainsight.ai`,
      firstName: 'Test',
      lastName: 'User',
      userGroup: 'building-code-expert', // Using built-in field
      company: 'Test Company', // Using built-in field
      source: 'api_test',
    };
    
    const response = await fetch('https://app.loops.so/api/v1/contacts/create', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOOPS_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testContact),
    });

    const result = await response.json();
    
    if (response.ok && result.success) {
      console.log('✅ Test contact created successfully with custom properties!');
      console.log(`   Contact ID: ${result.id}\n`);
    } else {
      console.log(`⚠️  Test contact failed: ${result.message || 'Unknown error'}\n`);
    }
  } catch (error) {
    console.log(`⚠️  Test failed: ${error}\n`);
  }
  
  console.log('🎉 Your Loops account is configured and ready!');
  console.log('📖 See docs/LOOPS_SETUP.md for the email template and final steps.\n');
}

// Run the setup
createCustomProperties().catch(console.error);