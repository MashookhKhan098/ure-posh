const bcrypt = require('bcryptjs');

// Test writer credentials
const testWriters = [
  {
    username: 'demo_writer',
    email: 'demo@ureposh.com',
    password: 'ureposh2024',
    full_name: 'Demo Writer',
    specialization: 'General',
    experience_level: 'intermediate'
  },
  {
    username: 'tech_writer',
    email: 'tech@ureposh.com',
    password: 'ureposh2024',
    full_name: 'Tech Writer',
    specialization: 'Technology',
    experience_level: 'expert'
  },
  {
    username: 'business_writer',
    email: 'business@ureposh.com',
    password: 'ureposh2024',
    full_name: 'Business Writer',
    specialization: 'Business',
    experience_level: 'intermediate'
  },
  {
    username: 'lifestyle_writer',
    email: 'lifestyle@ureposh.com',
    password: 'ureposh2024',
    full_name: 'Lifestyle Writer',
    specialization: 'Lifestyle',
    experience_level: 'beginner'
  }
];

console.log('🔐 Writer Authentication Test');
console.log('============================\n');

console.log('📝 Test Writer Accounts:');
testWriters.forEach((writer, index) => {
  console.log(`${index + 1}. ${writer.username} (${writer.full_name})`);
  console.log(`   Email: ${writer.email}`);
  console.log(`   Specialization: ${writer.specialization}`);
  console.log(`   Experience: ${writer.experience_level}`);
  console.log(`   Password: ${writer.password}`);
  console.log('');
});

console.log('🔑 Login Credentials:');
console.log('Username: Any of the above usernames');
console.log('Password: ureposh2024');
console.log('');

console.log('📋 Database Setup:');
console.log('1. Run the setup-writer-accounts.sql script in your database');
console.log('2. Make sure the writer_profiles table exists with the correct structure');
console.log('3. Test login at /writer');
console.log('');

console.log('🧪 Test Steps:');
console.log('1. Visit http://localhost:4000/writer');
console.log('2. Try logging in with any of the test accounts');
console.log('3. Check if the dashboard loads correctly');
console.log('4. Test logout functionality');
console.log('');

console.log('⚠️  Troubleshooting:');
console.log('- Ensure JWT_SECRET is set in your environment variables');
console.log('- Check database connection and table structure');
console.log('- Verify the writer_profiles table has the correct data');
console.log('- Check browser console for any errors'); 