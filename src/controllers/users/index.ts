import { Router } from 'express';
import { createUser } from './createUser';
import { getUser } from './getUser';
import { updateUser } from './updateUser';
import { deleteUser } from './deleteUser';
import { checkToken } from '../../middlewares/checkToken';

const Users = Router();

Users.post('/', createUser);

Users.get('/:id', checkToken, getUser);

Users.patch('/:id', checkToken, updateUser);

Users.delete('/:id', checkToken, deleteUser);

export default Users;
