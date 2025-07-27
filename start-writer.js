const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Ureposh Writer Portal...');
console.log('📝 Writer Portal will be available at: http://localhost:5000');
console.log('🌐 Main application continues at: http://localhost:4000');
console.log('');

// Start the writer server
const writerServer = spawn('node', ['writer-server.js'], {
  stdio: 'inherit',
  cwd: __dirname
});

writerServer.on('error', (error) => {
  console.error('❌ Failed to start writer server:', error.message);
  process.exit(1);
});

writerServer.on('close', (code) => {
  console.log(`\n📝 Writer server stopped with code ${code}`);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down writer server...');
  writerServer.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down writer server...');
  writerServer.kill('SIGTERM');
  process.exit(0);
}); 