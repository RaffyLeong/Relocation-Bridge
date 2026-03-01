import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import historyRoutes from './routes/history'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

// Middleware 
app.use(cors())
app.use(express.json())

// Testing 
app.get('/api/test', (req, res) => {
  res.json({ message: 'Test server working!' });
});

// Health check route (for Render)
app.get('/', (req, res) => {
  res.send('✅ Relocation Bridge API is healthy');
});

// Set up routes ONCE (outside the mongoose connection)
app.use('/api/history', historyRoutes);


// Connect to MongoDB first, THEN start server
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/relocation-bridge')
.then(() => {
  console.log("✅ Connected to MongoDB")

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`Test: http://localhost:${PORT}/api/test`);
    console.log(`History: http://localhost:${PORT}/api/history`);
  });
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err)

  app.listen(PORT, () => {
    console.log(`⚠️ Server running without DB on http://localhost:${PORT}`);
  });
})



