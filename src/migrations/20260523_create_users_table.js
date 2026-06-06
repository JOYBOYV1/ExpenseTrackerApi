import db from '../config/db.js';

export async function up() {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                "phoneNumber" VARCHAR(10) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('Users table created successfully');
    } catch (err) {
        console.error('Error creating users table:', err);
    }
}

export async function down() {
    try {
        await db.query('DROP TABLE IF EXISTS users;');
        console.log('Users table dropped successfully');
    }
    catch (err) {
        console.error('Error dropping users table:', err);
    }
}

up(); // Call the up function to create the users table when this migration is run