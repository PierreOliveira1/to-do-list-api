import { Router } from 'express';
import { checkToken } from '../../middlewares/checkToken';
import { createTask } from './createTask';
import { getAll } from './getAll';
import { getUnique } from './getUnique';

const ToDoList = Router();

ToDoList.get('/', checkToken, getAll);

ToDoList.get('/:id', checkToken, getUnique);

ToDoList.post('/', checkToken, createTask);

ToDoList.patch('/:id', checkToken);

ToDoList.delete('/:id', checkToken);

export default ToDoList;
