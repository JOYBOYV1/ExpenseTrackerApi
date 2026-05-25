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
            const Usersid = parseInt(req.params.id);
            const user = await userServices.getUserById(Usersid);
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
            const { name, email, password } = req.body;
            const result = await userServices.updateUser(id, name, email, password);
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