import express from 'express';
import Hanime from '../api/providers/hanime';
import { z } from 'zod';

const router = express.Router();
const hanime = new Hanime();

// Input validation schemas
const paginationSchema = z.object({
  page: z.string().transform(Number).optional(),
  perPage: z.string().transform(Number).optional(),
});

const searchSchema = paginationSchema.extend({
  query: z.string().min(1),
});

const slugSchema = z.object({
  slug: z.string().min(1),
});

// Recent videos endpoint
router.get('/recent', async (req, res) => {
  try {
    const { page, perPage } = paginationSchema.parse(req.query);
    const results = await hanime.getRecent(page, perPage);
    res.json(results);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Invalid input parameters', details: error.errors });
    } else {
      res.status(500).json({ error: 'Failed to fetch recent videos' });
    }
  }
});

// Search endpoint
router.get('/search', async (req, res) => {
  try {
    const { query, page, perPage } = searchSchema.parse(req.query);
    const results = await hanime.search(query, page, perPage);
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
router.get('/info/:slug', async (req, res) => {
  try {
    const { slug } = slugSchema.parse(req.params);
    const info = await hanime.getInfo(slug);
    res.json(info);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Invalid input parameters', details: error.errors });
    } else {
      res.status(500).json({ error: 'Failed to fetch info' });
    }
  }
});

// Episode endpoint
router.get('/episode/:slug', async (req, res) => {
  try {
    const { slug } = slugSchema.parse(req.params);
    const episode = await hanime.getEpisode(slug);
    res.json(episode);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Invalid input parameters', details: error.errors });
    } else {
      res.status(500).json({ error: 'Failed to fetch episode' });
    }
  }
});

export { router as hanimeRouter };
