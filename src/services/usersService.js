import ERROR_MESSAGES from "../constants/errorMessage.js";
import { UserModel } from "../models/userModel.js";
import CustomError from "../utils/customError.js";

export const userServices = {
    async getAllUsers() {
        return await UserModel.getAllUsers();
    },

    async getUserById(phoneNumber, password) {
        const user = await UserModel.getUserById(phoneNumber, password);
        if (!user) {
            throw new CustomError(ERROR_MESSAGES.USER_NOT_FOUND, 404);
        }
        return user;
    },

    async createUser(userDetails) {
        const { username, email, password, phoneNumber } = userDetails;

        const sanitizedUser = {
            username: username ? username.trim() : "",
            email: email ? email.trim().toLowerCase() : "",
            password: password ? password.trim() : "",
            phoneNumber: phoneNumber ? phoneNumber.trim() : "",
            createdAt: new Date()
        };
        const NewUser = await UserModel.createUser(sanitizedUser);
        return NewUser;
    },

    async updateUser(id, userDetails) {
        const { username, email, password, phoneNumber } = userDetails;
        
        const updates = {};
        if (username !== undefined) updates.username = username.trim();
        if (email !== undefined) updates.email = email.trim().toLowerCase();
        if (password !== undefined) updates.password = password.trim();
        if (phoneNumber !== undefined) updates.phoneNumber = phoneNumber.trim();

        const user = await UserModel.updateUser(id, updates);
        if (!user) {
            throw new CustomError(ERROR_MESSAGES.USER_NOT_FOUND, 404);
        }
        return user;
    },

    async deleteUser(id) {
        const AuthorizedUser = 1;

        // const userExit = await UserModel.getUserById(id);

        // if (!userExit) {
        //     throw new CustomError(ERROR_MESSAGES.USER_NOT_FOUND, 404);
        // }
        // if (userExit !== AuthorizedUser) {
        //     throw new CustomError(ERROR_MESSAGES.UNAUTHORIZED, 401);
        // }

        const user = await UserModel.deleteUser(id);

        if (user === 0) {
            throw new CustomError(ERROR_MESSAGES.INTERNAL_SERVER_ERROR, 500);
        }

        return user;
    }
}
