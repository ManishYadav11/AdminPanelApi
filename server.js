const express = require('express');
const bodyParser = require('body-parser');
const { connectToDB } = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const auditLogRoutes = require('./routes/auditLogRoutes');
const authRoutes = require('./routes/authRoutes');
const authenticateToken = require('./middleware/authMiddleware');
const ensureAdmin = require('./middleware/ensureAdmin');
require('dotenv').config();

// Importing models and sequelize instance
const sequelize = require('./config/dbConfig'); // Adjust the path if needed
const User = require('./models/userModel');
const Role = require('./models/roleModel');
const Project = require('./models/projectModel');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Establish database connection and sync models in correct order
connectToDB()

sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully.');
    // Sync Role first
    return Role.sync({ force: false });
  })
  .then(() => {
    console.log('Role table synced successfully.');
    // Then sync User
    return User.sync({ force: false });
  })
  .then(() => {
    console.log('User table synced successfully.');
    // Sync additional models as needed...
  })
  .catch((error) => {
    console.error('Error syncing tables:', error);
  });
  
app.use('/api/user', userRoutes);

// Protected routes (require authentication and admin access)
app.use('/api/auth',authenticateToken, ensureAdmin, authRoutes);  // only admin can access it
app.use('/api', authenticateToken, ensureAdmin, projectRoutes);
app.use('/api/audit-logs', authenticateToken, ensureAdmin, auditLogRoutes);

// Sample route
app.get('/', (req, res) => {
  res.send('This is simple route');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

