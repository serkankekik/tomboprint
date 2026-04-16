import { Router } from 'express';
import { queryAll, runSql } from '../db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// POST /api/contact — form gönderimi (public)
router.post('/', (req, res) => {
  const { name, email, company, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Ad, e-posta ve mesaj gerekli' });
  }

  const { insertId } = runSql(
    'INSERT INTO contact_messages (name, email, company, message) VALUES (?, ?, ?, ?)',
    [name, email, company || '', message]
  );
  res.status(201).json({ success: true, id: insertId });
});

// GET /api/contact — admin: tüm mesajları listele
router.get('/', authMiddleware, (_req, res) => {
  const messages = queryAll('SELECT * FROM contact_messages ORDER BY created_at DESC');
  res.json(messages);
});

// DELETE /api/contact/:id
router.delete('/:id', authMiddleware, (req, res) => {
  const { modified } = runSql('DELETE FROM contact_messages WHERE id = ?', [req.params.id]);
  if (modified === 0) return res.status(404).json({ error: 'Mesaj bulunamadı' });
  res.json({ success: true });
});

export default router;
