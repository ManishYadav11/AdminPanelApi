// const { Client } = require('pg');
// require('dotenv').config();

// // Define the connectToDB function
// function connectToDB() {
//   // Create a new client instance
//   const client = new Client({
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//       rejectUnauthorized: false
//     }
//   });

//   // Connect to the database
//   client.connect()
//     .then(() => console.log('Connected successfully'))
//     .catch(err => console.error('Connection error', err.stack));

//   // Return the client instance for use in other parts of the application
//   return client;
// }

// // Export the function using CommonJS syntax
// module.exports = { connectToDB };


const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: false // Set to true if you want to see SQL logs
});

module.exports = sequelize;
