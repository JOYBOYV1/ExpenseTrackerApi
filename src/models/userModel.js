import db from '../config/db.js';

export const UserModel = {
    async getAllUsers() {
        const query = 'SELECT * FROM users';
        const { rows } = await db.query(query);
        return rows;
    },

    async getUserById(id) {
        const query = 'SELECT * FROM users WHERE id = $1';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    },

    async createUser({ name, email, password, createdAt }) {
        const NewUser = await db.query('INSERT INTO users (username, email, password, created_at) VALUES ($1, $2, $3, $4) RETURNING *', [name, email, password, createdAt]);
        return NewUser.rows[0];
    },

    async updateUser(id, name, email, password) {
        const query = 'UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4 RETURNING *';
        const { rows } = await db.query(query, [name, email, password, id]);
        return rows[0];
    },

    async deleteUser(id) {
        const query = 'DELETE FROM users WHERE id = $1';
        const result = await db.query(query, [id]);
        return result.rowCount;
    }
}