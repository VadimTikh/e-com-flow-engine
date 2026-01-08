// src/api/routes/index.ts
import { Router } from 'express';

const router = Router();

router.get('/development', (_req, res) => {
  res.status(200).json({
    message: "In development",
    joke: "Why do programmers prefer dark mode? Because light attracts bugs.",
    note: "If it works, don't touch it."
  });
});

export default router;
