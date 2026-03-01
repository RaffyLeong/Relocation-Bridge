import express from "express";
import Comparison from '../models/Comparison'

const router = express.Router()

// handle the history data
// Get all comparisons
router.get('/', async (req, res) => {
  try {
    const comparisons = await Comparison.find().sort({ createdAt: -1 }).limit(20);
    res.json(comparisons);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch comparisons' });
  }
});

// Save a new comparison
router.post('/', async (req, res) => {
  try {
    const newComparison = new Comparison(req.body);
    await newComparison.save();
    res.status(201).json(newComparison);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save comparison' });
  }
});

// Clear all history
router.delete('/', async (req, res) => {
  try {
    await Comparison.deleteMany({});
    res.json({ message: 'All history cleared' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to clear history' });
  }
});

export default router;