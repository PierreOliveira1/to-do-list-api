import { verifyIdUser } from '@validators/verifyIdUser';
import { Router } from 'express';
import { checkToken } from '@middlewares/checkToken';
import {
	all,
	connect,
	create,
	del,
	leave,
	unique,
	update
} from './routes';
import {
	createValidator,
	updateValidator,
	uuidValidator
} from './validators';

const Rooms = Router();

Rooms.get('/', checkToken, verifyIdUser, all);

Rooms.get('/:id', checkToken, uuidValidator, unique);

Rooms.post('/', checkToken, verifyIdUser, createValidator, create);

Rooms.post('/connect/:id', checkToken, verifyIdUser, uuidValidator, connect);

Rooms.patch('/:id', checkToken, verifyIdUser, uuidValidator, updateValidator, update);

Rooms.delete('/:id', checkToken, verifyIdUser, uuidValidator, del);

Rooms.delete('/leave/:id', checkToken, verifyIdUser, uuidValidator, leave);

export default Rooms;
