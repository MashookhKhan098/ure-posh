const crypto = require('crypto');

const key = Buffer.from(process.env.ADMIN_WALLET_ENCRYPTION_KEY, 'hex'); // 32 bytes
const iv = Buffer.alloc(16, 0); // static IV for demo

const address = process.argv[2]?.toLowerCase();
if (!address) {
  console.error('Usage: node encryptWallet.js <wallet_address>');
  process.exit(1);
}

const cipher = crypto.createCipheriv('aes-256-ctr', key, iv);
let encrypted = cipher.update(address, 'utf8', 'hex');
encrypted += cipher.final('hex');
console.log(encrypted); 