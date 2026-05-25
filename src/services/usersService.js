import ERROR_MESSAGES from "../constants/errorMessage.js";
import { UserModel } from "../models/userModel.js";
import CustomError from "../utils/customError.js";

export const userServices = {
    async getAllUsers() {
        return await UserModel.getAllUsers();
    },

    async getUserById(id) {
        const user = await UserModel.getUserById(id);
        if (!user) {
            throw new CustomError(ERROR_MESSAGES.USER_NOT_FOUND, 404);
        }
        return user;
    },

    async createUser(userDetails) {
        const { name, email, password } = userDetails;

        const sanitizedUser = {
            name: name.trim(),
            email: email.trim().toLowerCase(),
            password: password.trim(),
            createdAt: new Date()
        };
        const NewUser = await UserModel.createUser(sanitizedUser);
        return NewUser;
    },

    async updateUser(id, name, email, password) {
        const user = await UserModel.updateUser(id, name, email, password);
        if (!user) {
            throw new CustomError(ERROR_MESSAGES.USER_NOT_FOUND, 404);
        }
        return user;
    },

    async deleteUser(id) {
        const AuthorizedUser = 1;

        const userExit = await UserModel.getUserById(id);

        if (!userExit) {
            throw new CustomError(ERROR_MESSAGES.USER_NOT_FOUND, 404);
        }
        if (userExit !== AuthorizedUser) {
            throw new CustomError(ERROR_MESSAGES.UNAUTHORIZED, 401);
        }

        const user = await UserModel.deleteUser(id);

        if (user === 0) {
            throw new CustomError(ERROR_MESSAGES.INTERNAL_SERVER_ERROR, 500);
        }

        return user;
    }
}
