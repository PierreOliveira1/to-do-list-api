import { Router } from 'express';
import { checkToken } from '@middlewares/checkToken';
import { create, del, getUnique, update } from './routes';
import { createValidator, updateValidator } from './validators';
import { verifyIdUser } from '@validators/verifyIdUser';

const Users = Router();

Users.post('/', createValidator, create);

Users.get('/', checkToken, verifyIdUser, getUnique);

Users.patch('/', checkToken, verifyIdUser, updateValidator, update);

Users.delete('/', checkToken, verifyIdUser, del);

export default Users;
