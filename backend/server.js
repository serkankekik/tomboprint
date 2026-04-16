import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { getDb } from './db.js';

import authRoutes from './routes/auth.js';
import slidersRoutes from './routes/sliders.js';
import blogRoutes from './routes/blog.js';
import aboutRoutes from './routes/about.js';
import partnersRoutes from './routes/partners.js';
import contactRoutes from './routes/contact.js';
import demoRoutes from './routes/demo.js';

const PORT = process.env.PORT || 3001;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

const app = express();

// Middleware
app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sliders', slidersRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/partners', partnersRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/demo', demoRoutes);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start
async function start() {
  await getDb();
  app.listen(PORT, () => {
    console.log(`TomboPrint API sunucusu çalışıyor: http://localhost:${PORT}`);
  });
}

start().catch(console.error);
