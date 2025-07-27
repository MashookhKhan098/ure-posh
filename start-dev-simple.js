const { spawn } = require('child_process');
const http = require('http');

const BACKEND_URL = 'http://localhost:3000';
const MAX_RETRIES = 30;
const RETRY_DELAY = 2000;

// Function to check if backend is ready
function checkBackendHealth() {
  return new Promise((resolve) => {
    const req = http.get(`${BACKEND_URL}/health`, (res) => {
      resolve(res.statusCode === 200);
    });
    
    req.on('error', () => {
      resolve(false);
    });
    
    req.setTimeout(1000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

// Function to wait for backend
async function waitForBackend() {
  console.log('🔍 Waiting for backend to be ready...');
  
  for (let i = 0; i < MAX_RETRIES; i++) {
    const isReady = await checkBackendHealth();
    if (isReady) {
      console.log('✅ Backend is ready!');
      return true;
    }
    
    console.log(`⏳ Backend not ready yet... (${i + 1}/${MAX_RETRIES})`);
    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
  }
  
  console.log('❌ Backend failed to start within timeout');
  return false;
}

// Function to start backend
function startBackend() {
  console.log('🚀 Starting backend...');
  const backend = spawn('npm', ['run', 'dev'], {
    cwd: './ureposh-backend',
    stdio: 'pipe',
    shell: true
  });

  backend.stdout.on('data', (data) => {
    console.log(`[Backend] ${data.toString().trim()}`);
  });

  backend.stderr.on('data', (data) => {
    console.log(`[Backend Error] ${data.toString().trim()}`);
  });

  return backend;
}

// Function to start frontend
function startFrontend() {
  console.log('🚀 Starting frontend...');
  const frontend = spawn('npm', ['run', 'dev'], {
    stdio: 'inherit',
    shell: true
  });

  return frontend;
}

// Main function
async function main() {
  try {
    // Start backend
    const backend = startBackend();
    
    // Wait for backend to be ready
    const backendReady = await waitForBackend();
    
    if (!backendReady) {
      console.log('❌ Failed to start backend. Exiting...');
      process.exit(1);
    }
    
    // Start frontend
    const frontend = startFrontend();
    
    // Handle process termination
    process.on('SIGINT', () => {
      console.log('\n🛑 Shutting down...');
      backend.kill();
      frontend.kill();
      process.exit(0);
    });
    
  } catch (error) {
    console.error('❌ Error starting services:', error);
    process.exit(1);
  }
}

main(); 