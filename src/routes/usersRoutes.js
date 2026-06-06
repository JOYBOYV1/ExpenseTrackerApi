import { Router} from 'express';
import { UsersController } from '../controllers/userController.js';
import { validateData } from '../middlewares/validationmiddleware.js';
import { createUserSchema } from '../schemas/userSchemas.js';
import { updateUserSchema } from '../schemas/userSchemas.js';

const router = Router();

router.get('/', UsersController.getAllUsers);

router.get('/Login', UsersController.getUserById);

router.post('/Create', validateData(createUserSchema), UsersController.createUser);

router.patch('/:id', validateData(updateUserSchema),UsersController.updateUser);

router.delete('/:id', UsersController.deleteUser);

export default router;