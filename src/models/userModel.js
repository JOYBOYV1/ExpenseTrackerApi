import db from '../config/db.js';

export const UserModel = {
    async getAllUsers() {
        const query = 'SELECT * FROM users';
        const { rows } = await db.query(query);
        return rows;
    },

    async getUserById(phoneNumber, password) {
        const query = 'SELECT * FROM users WHERE "phoneNumber" = $1 AND password = $2';
        const { rows } = await db.query(query, [phoneNumber, password]);
        return rows[0];
    },

    async createUser({ username, email, password, phoneNumber, createdAt }) {
        const NewUser = await db.query('INSERT INTO users (username, email, password, "phoneNumber", created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *', [username, email, password, phoneNumber, createdAt]);
        return NewUser.rows[0];
    },

    async updateUser(id, { username, email, password, phoneNumber }) {
        const updates = [];
        const values = [];
        let index = 1;

        if (username !== undefined) {
            updates.push(`username = $${index++}`);
            values.push(username);
        }
        if (email !== undefined) {
            updates.push(`email = $${index++}`);
            values.push(email);
        }
        if (password !== undefined) {
            updates.push(`password = $${index++}`);
            values.push(password);
        }
        if (phoneNumber !== undefined) {
            updates.push(`"phoneNumber" = $${index++}`);
            values.push(phoneNumber);
        }

        if (updates.length === 0) {
            const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [id]);
            return rows[0];
        }

        values.push(id);
        const query = `UPDATE users SET ${updates.join(', ')} WHERE id = $${index} RETURNING *`;
        const { rows } = await db.query(query, values);
        return rows[0];
    },

    async deleteUser(id) {
        const query = 'DELETE FROM users WHERE id = $1';
        const result = await db.query(query, [id]);
        return result.rowCount;
    }
}