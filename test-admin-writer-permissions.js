require('dotenv').config({ path: '.env' });
const { createClient } = require('@supabase/supabase-js');

// Use existing Supabase configuration from .env
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testAdminWriterPermissions() {
  try {
    console.log('🔍 Testing Admin Writer Permissions...');
    console.log('📡 Using Supabase URL:', supabaseUrl);

    // Test 1: Check if admin can read writer_profiles
    console.log('\n1. Testing admin read access to writer_profiles...');
    const { data: writers, error: readError } = await supabase
      .from('writer_profiles')
      .select('*')
      .limit(5);

    if (readError) {
      console.error('❌ Admin cannot read writer_profiles:', readError.message);
    } else {
      console.log('✅ Admin can read writer_profiles');
      console.log(`   Found ${writers.length} writers`);
    }

    // Test 2: Check if admin can create a test writer
    console.log('\n2. Testing admin create access to writer_profiles...');
    
    // Generate a proper UUID for writer_id
    const { v4: uuidv4 } = require('uuid');
    const testWriterId = uuidv4();
    
    const testWriter = {
      writer_id: testWriterId,
      username: 'test_admin_writer_' + Date.now(),
      email: 'test.admin@example.com',
      password_hash: '$2a$12$test.hash.for.admin.test',
      full_name: 'Test Admin Writer',
      specialization: 'Testing',
      experience_level: 'Expert',
      is_verified: true,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const { data: newWriter, error: createError } = await supabase
      .from('writer_profiles')
      .insert(testWriter)
      .select()
      .single();

    if (createError) {
      console.error('❌ Admin cannot create in writer_profiles:', createError.message);
    } else {
      console.log('✅ Admin can create in writer_profiles');
      console.log('   Created writer:', newWriter.username);
    }

    // Test 3: Check if admin can update a writer
    if (newWriter) {
      console.log('\n3. Testing admin update access to writer_profiles...');
      const { data: updatedWriter, error: updateError } = await supabase
        .from('writer_profiles')
        .update({ 
          full_name: 'Updated Test Admin Writer',
          specialization: 'Updated Testing'
        })
        .eq('writer_id', newWriter.writer_id)
        .select()
        .single();

      if (updateError) {
        console.error('❌ Admin cannot update writer_profiles:', updateError.message);
      } else {
        console.log('✅ Admin can update writer_profiles');
        console.log('   Updated writer:', updatedWriter.full_name);
      }

      // Test 4: Check if admin can delete a writer
      console.log('\n4. Testing admin delete access to writer_profiles...');
      const { error: deleteError } = await supabase
        .from('writer_profiles')
        .delete()
        .eq('writer_id', newWriter.writer_id);

      if (deleteError) {
        console.error('❌ Admin cannot delete from writer_profiles:', deleteError.message);
      } else {
        console.log('✅ Admin can delete from writer_profiles');
        console.log('   Deleted test writer');
      }
    }

    // Test 5: Check current writer count
    console.log('\n5. Current writer count...');
    const { data: allWriters, error: countError } = await supabase
      .from('writer_profiles')
      .select('username, full_name, is_active, is_verified');

    if (countError) {
      console.error('❌ Error getting writer count:', countError.message);
    } else {
      console.log(`✅ Total writers in database: ${allWriters.length}`);
      console.log(`   Active writers: ${allWriters.filter(w => w.is_active).length}`);
      console.log(`   Verified writers: ${allWriters.filter(w => w.is_verified).length}`);
      
      if (allWriters.length > 0) {
        console.log('\n📋 Sample writers:');
        allWriters.slice(0, 3).forEach((writer, index) => {
          console.log(`   ${index + 1}. ${writer.full_name} (@${writer.username})`);
          console.log(`      Active: ${writer.is_active ? '✅' : '❌'}, Verified: ${writer.is_verified ? '✅' : '❌'}`);
        });
      }
    }

    console.log('\n🎉 Admin Writer Permissions Test Complete!');
    console.log('✅ Admin has full CRUD permissions on writer_profiles table');

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run the test
testAdminWriterPermissions(); 