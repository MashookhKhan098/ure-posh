const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

console.log('🚀 Ureposh Backend Setup');
console.log('='.repeat(40));

// Generate JWT Secret
const jwtSecret = crypto.randomBytes(64).toString('hex');

// Create .env content
const envContent = `# JWT Configuration
JWT_SECRET=${jwtSecret}

# AWS DynamoDB Tables
ADMIN_TABLE=Ureposh-admin
POSTS_TABLE=ureposh-posts
WRITER_TABLE=ureposh-writers
COMMENTS_TABLE=ureposh-comments
VIEWS_TABLE=ureposh-views

# AWS S3 Bucket for Media Uploads
S3_BUCKET=ureposh-media-uploads

# AWS Region
AWS_REGION=eu-north-1

# Development Settings
NODE_ENV=development
PORT=3001
`;

// Check if .env already exists
const envPath = path.join(__dirname, 'ureposh-backend', '.env');
if (fs.existsSync(envPath)) {
  console.log('⚠️  .env file already exists. Skipping creation.');
} else {
  try {
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Created .env file with JWT secret');
  } catch (error) {
    console.log('❌ Failed to create .env file:', error.message);
    console.log('\n📝 Manual setup required:');
    console.log('1. Create .env file in ureposh-backend directory');
    console.log('2. Add the following content:');
    console.log('='.repeat(40));
    console.log(envContent);
    console.log('='.repeat(40));
  }
}

console.log('\n📋 Next Steps:');
console.log('1. cd ureposh-backend');
console.log('2. npm install');
console.log('3. npm run dev');
console.log('4. Test connection: node test-backend-connection.js');
console.log('\n🔗 S3 Bucket Setup:');
console.log('- Create bucket: ureposh-media-uploads');
console.log('- Region: eu-north-1');
console.log('- Configure CORS (see SETUP.md)'); 