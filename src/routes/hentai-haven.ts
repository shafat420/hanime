import express from 'express';
import { HentaiHaven } from '../api/providers/hentai-haven';
import { z } from 'zod';

const router = express.Router();
const hentaiHaven = new HentaiHaven();

// Input validation schemas
const searchQuerySchema = z.object({
  query: z.string().min(1),
});

const infoQuerySchema = z.object({
  id: z.string().min(1),
  episodesSort: z.enum(['ASC', 'DESC']).optional(),
});

// Search endpoint
router.get('/search', async (req, res) => {
  try {
    const { query } = searchQuerySchema.parse(req.query);
    const results = await hentaiHaven.fetchSearchResult(query);
    res.json(results);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Invalid input parameters', details: error.errors });
    } else {
      res.status(500).json({ error: 'Failed to fetch search results' });
    }
  }
});

// Info endpoint
router.get('/info/:id', async (req, res) => {
  try {
    const { id } = infoQuerySchema.parse(req.params);
    const { episodesSort } = infoQuerySchema.parse(req.query);
    const info = await hentaiHaven.fetchInfo(id, episodesSort);
    res.json(info);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Invalid input parameters', details: error.errors });
    } else {
      res.status(500).json({ error: 'Failed to fetch info' });
    }
  }
});

export { router as hentaiHavenRouter };
