import { Router } from 'express';
import { queryAll, runSql } from '../db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// POST /api/demo — demo talebi (public)
router.post('/', (req, res) => {
  const { name, email, company, phone, size, sector } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Ad ve e-posta gerekli' });
  }

  const { insertId } = runSql(
    'INSERT INTO demo_requests (name, email, company, phone, size, sector) VALUES (?, ?, ?, ?, ?, ?)',
    [name, email, company || '', phone || '', size || '', sector || '']
  );
  res.status(201).json({ success: true, id: insertId });
});

// GET /api/demo — admin: tüm talepleri listele
router.get('/', authMiddleware, (_req, res) => {
  const requests = queryAll('SELECT * FROM demo_requests ORDER BY created_at DESC');
  res.json(requests);
});

// DELETE /api/demo/:id
router.delete('/:id', authMiddleware, (req, res) => {
  const { modified } = runSql('DELETE FROM demo_requests WHERE id = ?', [req.params.id]);
  if (modified === 0) return res.status(404).json({ error: 'Talep bulunamadı' });
  res.json({ success: true });
});

export default router;
