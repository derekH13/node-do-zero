// db.js
import { createServer } from 'http';  // Importing directly
import dotenv from 'dotenv';  // Correct way to import in ESM
import { neon } from '@neondatabase/serverless'; // Direct import for neon

dotenv.config();  // Load environment variables

// Create a neon client instance using DATABASE_URL from .env
export const sql = neon(process.env.DATABASE_URL);

const requestHandler = async (req, res) => {
  try {
    // Perform a query to fetch database version
    const result = await sql`SELECT version()`;
    const { version } = result[0];

    // Send the version response
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(version);
  } catch (error) {
    // If an error occurs, send it as a response
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Database connection error: " + error.message);
  }
};

// Create and start the HTTP server
createServer(requestHandler).listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
