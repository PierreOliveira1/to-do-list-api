import { Router } from 'express';
import { createUser } from './createUser';
import { getUser } from './getUser';
import { updateUser } from './updateUser';
import { deleteUser } from './deleteUser';
import { checkToken } from '../../middlewares/checkToken';

const Users = Router();

Users.post('/', createUser);

Users.get('/', checkToken, getUser);

Users.patch('/', checkToken, updateUser);

Users.delete('/', checkToken, deleteUser);

export default Users;
