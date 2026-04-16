import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { getDb, runSql, queryOne } from './db.js';

const USERNAME = process.env.ADMIN_USER || 'admin';
const PASSWORD = process.env.ADMIN_PASS || 'admin123';

async function seed() {
  await getDb();

  const existing = queryOne('SELECT id FROM users WHERE username = ?', [USERNAME]);
  if (existing) {
    console.log(`Kullanıcı "${USERNAME}" zaten mevcut (id: ${existing.id})`);
    return;
  }

  const hash = await bcrypt.hash(PASSWORD, 10);
  runSql('INSERT INTO users (username, password) VALUES (?, ?)', [USERNAME, hash]);
  console.log(`Admin kullanıcı oluşturuldu: ${USERNAME}`);
}

seed().catch(console.error);
