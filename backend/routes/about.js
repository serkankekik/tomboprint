import { Router } from 'express';
import { queryOne, runSql } from '../db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// GET /api/about
router.get('/', (_req, res) => {
  const about = queryOne('SELECT * FROM about WHERE id = 1');
  res.json(about);
});

// PUT /api/about
router.put('/', authMiddleware, (req, res) => {
  const { mission, address, email, phone, founded, team, customers } = req.body;
  const existing = queryOne('SELECT * FROM about WHERE id = 1');

  runSql(
    'UPDATE about SET mission = ?, address = ?, email = ?, phone = ?, founded = ?, team = ?, customers = ? WHERE id = 1',
    [
      mission ?? existing.mission,
      address ?? existing.address,
      email ?? existing.email,
      phone ?? existing.phone,
      founded ?? existing.founded,
      team ?? existing.team,
      customers ?? existing.customers,
    ]
  );
  const updated = queryOne('SELECT * FROM about WHERE id = 1');
  res.json(updated);
});

export default router;
