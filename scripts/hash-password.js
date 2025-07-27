const bcrypt = require('bcryptjs');

async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  console.log('Original password:', password);
  console.log('Hashed password:', hashedPassword);
  return hashedPassword;
}

// Hash the default admin password
hashPassword('ureposh2024').then(() => {
  console.log('\nUse this hashed password in your Supabase admin table setup.');
}); 