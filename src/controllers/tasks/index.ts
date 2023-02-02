import { Router } from 'express';
import { checkToken } from '@middlewares/checkToken';
import { all, create, unique, update } from './routes';

const Tasks = Router();

Tasks.get('/', checkToken, all);

Tasks.get('/:id', checkToken, unique);

Tasks.post('/', checkToken, create);

Tasks.patch('/:id', checkToken, update);

Tasks.delete('/:id', checkToken);

export default Tasks;
