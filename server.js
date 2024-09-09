// const express = require('express');
// const bodyParser = require('body-parser');
// const { connectToDB } = require('./config/db');

// const userRoutes = require('./routes/userRoutes');
// const projectRoutes = require('./routes/projectRoutes');
// const auditLogRoutes = require('./routes/auditLogRoutes');
// const authRoutes = require('./routes/authRoutes');
// const authenticateToken = require('./middleware/authMiddleware'); // Updated import path
// const ensureAdmin = require('./middleware/ensureAdmin'); // Add this line

// require('dotenv').config();

// // server.js
// const sequelize = require('./config/dbConfig'); // Adjust the path as necessary
// const User = require('./models/userModel');
// const Role = require('./models/roleModel');
// const Project = require('./models/projectModel');

// // Sync all defined models to the database
// sequelize.sync({ force: false }) // Use `force: true` if you want to drop tables and recreate them
//   .then(() => {
//     console.log('All tables synced successfully!');
//   })
//   .catch((error) => {
//     console.error('Error syncing tables:', error);
//   });


// const app = express();
// const port = process.env.PORT || 3000;

// // Middleware
// app.use(bodyParser.json());

// // Database connection
// connectToDB();

// // Open routes (no authentication required)
// app.use('/api/auth', authRoutes); 
// app.use('/api/user', userRoutes); 

// // Protected routes (require authentication and admin access)
// app.use('/api', authenticateToken, ensureAdmin, projectRoutes); // Project routes
// app.use('/api/audit-logs', authenticateToken, ensureAdmin, auditLogRoutes); // Audit log routes

// // Sample route
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// // Start server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

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

