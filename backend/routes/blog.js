import { Router } from 'express';
import { queryAll, queryOne, runSql } from '../db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// GET /api/blog
router.get('/', (_req, res) => {
  const posts = queryAll('SELECT * FROM blog ORDER BY date DESC');
  res.json(posts);
});

// GET /api/blog/:id
router.get('/:id', (req, res) => {
  const post = queryOne('SELECT * FROM blog WHERE id = ?', [req.params.id]);
  if (!post) return res.status(404).json({ error: 'Yazı bulunamadı' });
  res.json(post);
});

// POST /api/blog
router.post('/', authMiddleware, (req, res) => {
  const { title, excerpt, content, category, date } = req.body;
  if (!title) return res.status(400).json({ error: 'Başlık gerekli' });

  const { insertId } = runSql(
    'INSERT INTO blog (title, excerpt, content, category, date) VALUES (?, ?, ?, ?, ?)',
    [title, excerpt || '', content || '', category || 'Genel', date || new Date().toISOString().split('T')[0]]
  );
  const post = queryOne('SELECT * FROM blog WHERE id = ?', [insertId]);
  res.status(201).json(post);
});

// PUT /api/blog/:id
router.put('/:id', authMiddleware, (req, res) => {
  const existing = queryOne('SELECT * FROM blog WHERE id = ?', [req.params.id]);
  if (!existing) return res.status(404).json({ error: 'Yazı bulunamadı' });

  const { title, excerpt, content, category, date } = req.body;
  runSql(
    'UPDATE blog SET title = ?, excerpt = ?, content = ?, category = ?, date = ? WHERE id = ?',
    [
      title ?? existing.title,
      excerpt ?? existing.excerpt,
      content ?? existing.content,
      category ?? existing.category,
      date ?? existing.date,
      req.params.id,
    ]
  );
  const updated = queryOne('SELECT * FROM blog WHERE id = ?', [req.params.id]);
  res.json(updated);
});

// DELETE /api/blog/:id
router.delete('/:id', authMiddleware, (req, res) => {
  const { modified } = runSql('DELETE FROM blog WHERE id = ?', [req.params.id]);
  if (modified === 0) return res.status(404).json({ error: 'Yazı bulunamadı' });
  res.json({ success: true });
});

export default router;
