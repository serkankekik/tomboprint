import { Router } from 'express';
import { queryAll, queryOne, runSql } from '../db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// GET /api/sliders
router.get('/', (_req, res) => {
  const sliders = queryAll('SELECT * FROM sliders ORDER BY sort_order ASC');
  res.json(sliders);
});

// POST /api/sliders
router.post('/', authMiddleware, (req, res) => {
  const { title, subtitle, bg, sort_order } = req.body;
  if (!title) return res.status(400).json({ error: 'Başlık gerekli' });

  const { insertId } = runSql(
    'INSERT INTO sliders (title, subtitle, bg, sort_order) VALUES (?, ?, ?, ?)',
    [title, subtitle || '', bg || '#1a1a1a', sort_order || 0]
  );
  const slider = queryOne('SELECT * FROM sliders WHERE id = ?', [insertId]);
  res.status(201).json(slider);
});

// PUT /api/sliders/:id
router.put('/:id', authMiddleware, (req, res) => {
  const { title, subtitle, bg, sort_order } = req.body;
  const existing = queryOne('SELECT * FROM sliders WHERE id = ?', [req.params.id]);
  if (!existing) return res.status(404).json({ error: 'Slider bulunamadı' });

  runSql(
    'UPDATE sliders SET title = ?, subtitle = ?, bg = ?, sort_order = ? WHERE id = ?',
    [
      title ?? existing.title,
      subtitle ?? existing.subtitle,
      bg ?? existing.bg,
      sort_order ?? existing.sort_order,
      req.params.id,
    ]
  );
  const updated = queryOne('SELECT * FROM sliders WHERE id = ?', [req.params.id]);
  res.json(updated);
});

// DELETE /api/sliders/:id
router.delete('/:id', authMiddleware, (req, res) => {
  const { modified } = runSql('DELETE FROM sliders WHERE id = ?', [req.params.id]);
  if (modified === 0) return res.status(404).json({ error: 'Slider bulunamadı' });
  res.json({ success: true });
});

export default router;
