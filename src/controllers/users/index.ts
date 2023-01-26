import { Router } from 'express';
import { checkToken } from '@middlewares/checkToken';
import { create, del, getUnique, update } from './routes';
import { createValidator, updateValidator } from './validators';

const Users = Router();

Users.post('/', createValidator, create);

Users.get('/', checkToken, getUnique);

Users.patch('/', checkToken, updateValidator, update);

Users.delete('/', checkToken, del);

export default Users;
