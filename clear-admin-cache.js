// Clear admin authentication cache
console.log('🧹 Clearing admin authentication cache...');

// Clear localStorage items
if (typeof window !== 'undefined') {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminUser');
  console.log('✅ Admin tokens cleared from localStorage');
  console.log('🔄 Please refresh the page to see the login form');
} else {
  console.log('❌ This script must be run in the browser');
  console.log('📝 Instructions:');
  console.log('1. Open browser console (F12)');
  console.log('2. Go to http://localhost:3000/admin');
  console.log('3. Run this script in the console');
  console.log('4. Refresh the page');
}

// Instructions for manual clearing
console.log('\n📋 Manual Instructions:');
console.log('1. Open browser developer tools (F12)');
console.log('2. Go to Application/Storage tab');
console.log('3. Find localStorage for localhost:3000');
console.log('4. Delete "adminToken" and "adminUser" entries');
console.log('5. Refresh the page'); 