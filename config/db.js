const { Client } = require('pg');
require('dotenv').config();

// Define the connectToDB function
function connectToDB() {
  // Create a new client instance
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  // Connect to the database and return the promise
  return client.connect()
    .then(() => {
      console.log('Database Connected successfully');
      return client; // Return the client instance for further use
    })
    .catch(err => {
      console.error('Connection error', err.stack);
      throw err; // Re-throw the error to propagate it up the promise chain
    });
}

// Export the function using CommonJS syntax
module.exports = { connectToDB };
