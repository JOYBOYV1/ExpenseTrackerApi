import { userServices } from '../services/usersService.js';

export const UsersController = {
    async getAllUsers(req, res, next) {
        try {
            const users = await userServices.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    },

    async getUserById(req, res, next) {
        try {
            const UserPhoneNumber = req.query.phoneNumber;
            const UserPassword = req.query.password;
            const user = await userServices.getUserById(UserPhoneNumber, UserPassword);
            res.status(200).json(user);

        } catch (error) {
            next(error);
        }
    },

    async createUser(req, res, next) {
        try {
            const userData = req.body;
            const result = await userServices.createUser(userData);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    },

    async updateUser(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            const { username, email, password, phoneNumber } = req.body;
            const result = await userServices.updateUser(id, { username, email, password, phoneNumber });
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    async deleteUser(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            const result = await userServices.deleteUser(id);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

}