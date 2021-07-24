const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;
const isProd = process.env.NODE_ENV === "production";
const ssl = isProd ? { rejectUnauthorized: false } : false; // Disallow SSL unauthorized requests for Heroku quick deployment 🙈

const pool = new Pool({ connectionString, ssl });

Object.assign(module.exports, { buildDatabaseWrapper });

function buildDatabaseWrapper() {
    return {
        query
    };
}

async function query(queryText, params = null) {
    try {

        const dbResult = await pool.query(queryText, params);
        return dbResult.rows;

    } catch (error) {
        console.log("A wild DB error appeared. Better handle them all!");
        throw new Error(error);
    }
}
