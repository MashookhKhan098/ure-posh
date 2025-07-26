const { DynamoDBClient, ListTablesCommand } = require("@aws-sdk/client-dynamodb");
const { S3Client, ListBucketsCommand } = require("@aws-sdk/client-s3");

require('dotenv').config({ path: '.env.local' });

async function testAWSConnection() {
  console.log('🔍 Testing AWS Connection...\n');

  // Test DynamoDB
  try {
    const ddbClient = new DynamoDBClient({ 
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      }
    });

    const tables = await ddbClient.send(new ListTablesCommand({}));
    console.log('✅ DynamoDB Connection Successful!');
    console.log('📋 Available Tables:', tables.TableNames);
    
    if (tables.TableNames.includes(process.env.AWS_POSTS_TABLE)) {
      console.log(`✅ Posts table "${process.env.AWS_POSTS_TABLE}" exists`);
    } else {
      console.log(`❌ Posts table "${process.env.AWS_POSTS_TABLE}" not found`);
    }
  } catch (error) {
    console.log('❌ DynamoDB Connection Failed:', error.message);
  }

  console.log('\n' + '='.repeat(50) + '\n');

  // Test S3
  try {
    const s3Client = new S3Client({ 
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      }
    });

    const buckets = await s3Client.send(new ListBucketsCommand({}));
    console.log('✅ S3 Connection Successful!');
    console.log('📦 Available Buckets:', buckets.Buckets.map(b => b.Name));
    
    if (buckets.Buckets.some(b => b.Name === process.env.AWS_S3_BUCKET)) {
      console.log(`✅ S3 bucket "${process.env.AWS_S3_BUCKET}" exists`);
    } else {
      console.log(`❌ S3 bucket "${process.env.AWS_S3_BUCKET}" not found`);
    }
  } catch (error) {
    console.log('❌ S3 Connection Failed:', error.message);
  }

  console.log('\n' + '='.repeat(50) + '\n');
  console.log('📝 Environment Variables Check:');
  console.log('AWS_REGION:', process.env.AWS_REGION || '❌ Not set');
  console.log('AWS_ACCESS_KEY_ID:', process.env.AWS_ACCESS_KEY_ID ? '✅ Set' : '❌ Not set');
  console.log('AWS_SECRET_ACCESS_KEY:', process.env.AWS_SECRET_ACCESS_KEY ? '✅ Set' : '❌ Not set');
  console.log('AWS_POSTS_TABLE:', process.env.AWS_POSTS_TABLE || '❌ Not set');
  console.log('AWS_S3_BUCKET:', process.env.AWS_S3_BUCKET || '❌ Not set');
}

testAWSConnection().catch(console.error);
