import pg from 'pg';

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
});

// //function to test the database connection
// async function getPgVersion() {
//     const client = await pool.connect();
//     try {
//         const res = await client.query('SELECT version()');
//         console.log('PostgreSQL version:', res.rows[0].version);
//     } finally {
//         client.release();
//     }
// }

// getPgVersion(); // call the function to test the database connection

export default pool;