const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Atlas Connection
const MONGODB_URI = "mongodb+srv://ahmed:ahmed@cluster0.0hhtvrr.mongodb.net/smit-project?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGODB_URI)
.then(() => {
  console.log('✅ Connected to MongoDB successfully');
  console.log('📊 Database: smit-project');
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
});

// Simple Schema for your data
const dataSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Data = mongoose.model('Data', dataSchema);

// Routes

// Health check
app.get('/', (req, res) => {
  res.json({
    message: '🚀 MongoDB Server is running!',
    database: 'smit-project',
    timestamp: new Date().toISOString()
  });
});

// Add data to MongoDB
app.post('/api/add', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    const newData = new Data({
      name,
      email,
      message
    });

    const savedData = await newData.save();
    
    res.status(201).json({
      success: true,
      message: 'Data added successfully!',
      data: savedData
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error adding data',
      error: error.message
    });
  }
});

// Get all data from MongoDB
app.get('/api/data', async (req, res) => {
  try {
    const allData = await Data.find().sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: allData.length,
      data: allData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching data',
      error: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📊 Database: smit-project`);
  console.log(`🌐 API Base URL: http://localhost:${PORT}`);
  console.log(`📝 API Endpoints:`);
  console.log(`   GET    /              - Health check`);
  console.log(`   POST   /api/add       - Add data to MongoDB`);
  console.log(`   GET    /api/data      - Get all data from MongoDB`);
}); 