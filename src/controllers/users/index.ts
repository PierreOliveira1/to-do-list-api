import { Router } from 'express';
import { createUser } from './handle/createUser';
import { getUser } from './handle/getUser';
import { updateUser } from './handle/updateUser';
import { deleteUser } from './handle/deleteUser';

const Users = Router();

Users.post('/', createUser);

Users.get('/:id', getUser);

Users.patch('/:id', updateUser);

Users.delete('/:id', deleteUser);

export default Users;
