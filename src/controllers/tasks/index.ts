import { Router } from 'express';
import { checkToken } from '../../middlewares/checkToken';
import { createTask } from './createTask';
import { getAll } from './getAll';
import { getUnique } from './getUnique';
import { update } from './update';

const Tasks = Router();

Tasks.get('/', checkToken, getAll);

Tasks.get('/:id', checkToken, getUnique);

Tasks.post('/', checkToken, createTask);

Tasks.patch('/:id', checkToken, update);

Tasks.delete('/:id', checkToken);

export default Tasks;
