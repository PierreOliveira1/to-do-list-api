import { Router } from 'express';
import { checkToken } from '../../middlewares/checkToken';
import { all } from './all';
import { create } from './create';
import { del } from './delete';
import { unique } from './unique';
import { update } from './update';

const Rooms = Router();

Rooms.get('/', checkToken, all);

Rooms.get('/:id', checkToken, unique);

Rooms.post('/', checkToken, create);

Rooms.patch('/:id', checkToken, update);

Rooms.delete('/:id', checkToken, del);

export default Rooms;
