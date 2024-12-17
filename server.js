const express = require('express'); // Import Express
const sequelize = require('./config/db'); // Import Sequelize connection
const userRoutes = require('./routes/userRoutes'); // Import routes

const app = express(); // Initialize Express

// Middleware to parse JSON requests
app.use(express.json()); 

// Use user routes
app.use('/api/users', userRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Sync database and start server
const PORT = 3000;

sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synced successfully.');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });
