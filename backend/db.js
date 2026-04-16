import initSqlJs from 'sql.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'tomboprint.db');

let db;

export async function getDb() {
  if (db) return db;

  const SQL = await initSqlJs();

  if (fs.existsSync(DB_PATH)) {
    const buffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }

  // Schema
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS sliders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      subtitle TEXT,
      bg TEXT DEFAULT '#1a1a1a',
      sort_order INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS blog (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      excerpt TEXT,
      content TEXT,
      category TEXT DEFAULT 'Genel',
      date TEXT DEFAULT (date('now')),
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS about (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      mission TEXT,
      address TEXT,
      email TEXT,
      phone TEXT,
      founded TEXT,
      team TEXT,
      customers TEXT
    );

    CREATE TABLE IF NOT EXISTS partners (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      logo TEXT,
      sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      company TEXT,
      message TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS demo_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      company TEXT,
      phone TEXT,
      size TEXT,
      sector TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);

  // Seed about
  const aboutRows = db.exec('SELECT id FROM about WHERE id = 1');
  if (aboutRows.length === 0) {
    db.run(
      `INSERT INTO about (id, mission, address, email, phone, founded, team, customers)
       VALUES (1, ?, ?, ?, ?, ?, ?, ?)`,
      [
        'İşletmelerin yazıcı altyapısını tam kontrol altına almasını sağlamak; maliyetleri düşürmek, güvenliği artırmak ve operasyonel verimliliği maksimize etmek.',
        'Üniversiteler Mh, Bilkent Cyberpark Tepe Binası No:Z39, 06800 Çankaya, Ankara, TR',
        'info@tomboprint.com',
        '+90 312 000 00 00',
        '2018',
        '45+',
        '500+',
      ]
    );
  }

  // Seed sliders
  const sliderRows = db.exec('SELECT COUNT(*) as c FROM sliders');
  if (sliderRows[0].values[0][0] === 0) {
    db.run('INSERT INTO sliders (title, subtitle, bg, sort_order) VALUES (?, ?, ?, ?)', ['Yazıcıları ve Baskıları Yönetin', 'Güvenli, ölçeklenebilir ve modern baskı yönetim platformu.', '#1a1a1a', 1]);
    db.run('INSERT INTO sliders (title, subtitle, bg, sort_order) VALUES (?, ?, ?, ?)', ['Bulut Baskıya Geçin', 'Ofis dışından güvenli baskı — her yerden, her cihazdan.', '#0a1628', 2]);
    db.run('INSERT INTO sliders (title, subtitle, bg, sort_order) VALUES (?, ?, ?, ?)', ['Maliyetleri %30 Azaltın', 'Akıllı raporlama ve kota yönetimiyle baskı harcamalarınızı kontrol altına alın.', '#1a0a00', 3]);
  }

  // Seed blog
  const blogRows = db.exec('SELECT COUNT(*) as c FROM blog');
  if (blogRows[0].values[0][0] === 0) {
    db.run('INSERT INTO blog (title, excerpt, category, date) VALUES (?, ?, ?, ?)', ['Kurumsal Baskı Güvenliği: 2024 Kılavuzu', 'Zero-trust yaklaşımıyla yazıcı güvenliğini nasıl sağlarsınız?', 'Güvenlik', '2024-11-15']);
    db.run('INSERT INTO blog (title, excerpt, category, date) VALUES (?, ?, ?, ?)', ['Bulut Baskıya Geçişin 5 Adımı', 'On-premise altyapıdan buluta geçerken dikkat edilmesi gerekenler.', 'Bulut', '2024-10-28']);
    db.run('INSERT INTO blog (title, excerpt, category, date) VALUES (?, ?, ?, ?)', ['Baskı Maliyetlerini Azaltmanın 10 Yolu', 'Akıllı politikalar ve raporlama araçlarıyla baskı giderlerinizi optimize edin.', 'Maliyet', '2024-10-10']);
  }

  // Seed partners
  const partnerRows = db.exec('SELECT COUNT(*) as c FROM partners');
  if (partnerRows[0].values[0][0] === 0) {
    ['HP', 'Canon', 'Kyocera', 'Xerox', 'Ricoh', 'Brother'].forEach((name, i) => {
      db.run('INSERT INTO partners (name, logo, sort_order) VALUES (?, ?, ?)', [name, name, i + 1]);
    });
  }

  saveDb();
  return db;
}

export function saveDb() {
  if (!db) return;
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(DB_PATH, buffer);
}

// Helper: sql.js exec sonucunu obje dizisine çevir
export function queryAll(sql, params = []) {
  const stmt = db.prepare(sql);
  if (params.length) stmt.bind(params);
  const rows = [];
  while (stmt.step()) {
    rows.push(stmt.getAsObject());
  }
  stmt.free();
  return rows;
}

export function queryOne(sql, params = []) {
  const rows = queryAll(sql, params);
  return rows[0] || null;
}

export function runSql(sql, params = []) {
  db.run(sql, params);
  const modified = db.getRowsModified();
  // last_insert_rowid'yi saveDb'den ÖNCE al
  const result = db.exec('SELECT last_insert_rowid()');
  const insertId = (result.length > 0 && result[0].values.length > 0) ? result[0].values[0][0] : null;
  saveDb();
  return { modified, insertId };
}
