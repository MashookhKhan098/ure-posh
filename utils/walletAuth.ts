import fs from 'fs';
import path from 'path';

export function isAdminWallet(address: string): boolean {
  const filePath = path.join(process.cwd(), 'admin-wallets.txt');
  if (!fs.existsSync(filePath)) return false;
  const allowed = fs.readFileSync(filePath, 'utf8')
    .split('\n')
    .map(l => l.trim().toLowerCase())
    .filter(Boolean);
  return allowed.includes(address.toLowerCase());
} 