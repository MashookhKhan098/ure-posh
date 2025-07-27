const bcrypt = require('bcryptjs');

function hashPassword(password) {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
}

function verifyPassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}

// Example usage
const password = process.argv[2] || 'writer123';
const hashedPassword = hashPassword(password);

console.log('🔐 Password Hashing Utility');
console.log('============================\n');

console.log('Password:', password);
console.log('Hashed Password:', hashedPassword);
console.log('');

// Test verification
const isValid = verifyPassword(password, hashedPassword);
console.log('Verification Test:', isValid ? '✅ PASS' : '❌ FAIL');
console.log('');

console.log('📝 SQL to add this writer:');
console.log(`INSERT INTO writer_profiles (
  username,
  email,
  password_hash,
  full_name,
  specialization,
  experience_level,
  is_verified,
  is_active
) VALUES (
  'your_username',
  'your_email@example.com',
  '${hashedPassword}',
  'Your Full Name',
  'Your Specialization',
  'intermediate',
  true,
  true
);`);
console.log('');

console.log('💡 Usage:');
console.log('  node hash-writer-password.js "your_password"');
console.log('  node hash-writer-password.js writer123'); 