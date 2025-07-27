const crypto = require('crypto');

// Generate a secure JWT secret
const jwtSecret = crypto.randomBytes(64).toString('hex');

console.log('🔐 Generated JWT Secret:');
console.log('');
console.log(`JWT_SECRET=${jwtSecret}`);
console.log('');
console.log('📝 Add this to your .env.local file');
console.log('⚠️  Keep this secret secure and never commit it to version control');
console.log('');
console.log('🔒 Security Tips:');
console.log('- Use different secrets for development and production');
console.log('- Rotate secrets regularly in production');
console.log('- Store secrets securely (e.g., environment variables, secret managers)'); 