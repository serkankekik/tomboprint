import { Router } from 'express';
import { queryAll, queryOne, runSql } from '../db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// GET /api/partners
router.get('/', (_req, res) => {
  const partners = queryAll('SELECT * FROM partners ORDER BY sort_order ASC');
  res.json(partners);
});

// POST /api/partners
router.post('/', authMiddleware, (req, res) => {
  const { name, logo, sort_order } = req.body;
  if (!name) return res.status(400).json({ error: 'Partner adı gerekli' });

  const { insertId } = runSql(
    'INSERT INTO partners (name, logo, sort_order) VALUES (?, ?, ?)',
    [name, logo || name, sort_order || 0]
  );
  const partner = queryOne('SELECT * FROM partners WHERE id = ?', [insertId]);
  res.status(201).json(partner);
});

// PUT /api/partners/:id
router.put('/:id', authMiddleware, (req, res) => {
  const existing = queryOne('SELECT * FROM partners WHERE id = ?', [req.params.id]);
  if (!existing) return res.status(404).json({ error: 'Partner bulunamadı' });

  const { name, logo, sort_order } = req.body;
  runSql(
    'UPDATE partners SET name = ?, logo = ?, sort_order = ? WHERE id = ?',
    [name ?? existing.name, logo ?? existing.logo, sort_order ?? existing.sort_order, req.params.id]
  );
  const updated = queryOne('SELECT * FROM partners WHERE id = ?', [req.params.id]);
  res.json(updated);
});

// DELETE /api/partners/:id
router.delete('/:id', authMiddleware, (req, res) => {
  const { modified } = runSql('DELETE FROM partners WHERE id = ?', [req.params.id]);
  if (modified === 0) return res.status(404).json({ error: 'Partner bulunamadı' });
  res.json({ success: true });
});

export default router;
