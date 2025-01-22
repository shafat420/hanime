import express from 'express';
import { Rule34 } from '../api/providers/rule34';
import { z } from 'zod';

const router = express.Router();
const rule34 = new Rule34();

// Input validation schemas
const searchQuerySchema = z.object({
  query: z.string().min(1),
  page: z.string().transform(Number).optional(),
  perPage: z.string().transform(Number).optional(),
});

const infoQuerySchema = z.object({
  id: z.string().min(1),
});

// Search endpoint
router.get('/search', async (req, res) => {
  try {
    const { query, page, perPage } = searchQuerySchema.parse(req.query);
    const results = await rule34.fetchSearchResult(query, page, perPage);
    res.json(results);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Invalid input parameters', details: error.errors });
    } else {
      res.status(500).json({ error: 'Failed to fetch search results' });
    }
  }
});

// Autocomplete endpoint
router.get('/autocomplete', async (req, res) => {
  try {
    const { query } = z.object({ query: z.string() }).parse(req.query);
    const results = await rule34.fetchSearchAutocomplete(query);
    res.json(results);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Invalid input parameters', details: error.errors });
    } else {
      res.status(500).json({ error: 'Failed to fetch autocomplete results' });
    }
  }
});

// Info endpoint
router.get('/info/:id', async (req, res) => {
  try {
    const { id } = infoQuerySchema.parse(req.params);
    const info = await rule34.fetchInfo(id);
    res.json(info);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Invalid input parameters', details: error.errors });
    } else {
      res.status(500).json({ error: 'Failed to fetch info' });
    }
  }
});

export { router as rule34Router };
