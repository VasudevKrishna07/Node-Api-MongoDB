require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const logger = require('./middlewares/logger');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

// Parse JSON
app.use(express.json());

// Log every request
app.use(logger);

// Root welcome route
app.get('/', (req, res) => {
  res.send('Welcome to the User API with MongoDB! Use /api/users');
});

// Ignore favicon requests
app.get('/favicon.ico', (req, res) => res.status(204).end());

// API routes
app.use('/api', userRoutes);

// 404 handler for unmatched URLs
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Connect to MongoDB Atlas and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
