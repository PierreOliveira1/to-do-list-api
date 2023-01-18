import { Request, Response, Router } from 'express';
import { prisma } from '../../database';
import { User } from '../../dtos/user';

const Users = Router();

Users.post('/', async (req: Request, res: Response) => {
	const { email, fullName, password }: User = req.body;

	const userAlreadyExists = await prisma.user.findFirst({
		where: {
			email,
		}
	});

	if(userAlreadyExists) {
		return res
			.send({ error: true, message: 'User already exists' });
	}

	const user = await prisma.user.create({
		data: {
			email,
			fullName,
			password
		}
	});

	if(!user) {
		return res
			.status(400)
			.send({ error: true, message: 'Error creating user' });
	}

	return res
		.status(201)
		.send({ success: true, message: 'User created successfully' });
});

Users.get('/:id', async (req: Request, res: Response) => {
	const { id } = req.params;

	const user = await prisma.user.findFirst({
		where: {
			id,
		}
	});

	if (!user) {
		return res
			.status(400)
			.send({ error: true, message: 'User does not exist' });
	}

	return res
		.status(200)
		.send({ user });
});

Users.patch('/:id', async (req: Request, res: Response) => {
	const { id } = req.params;
	const body = req.body;

	const user = await prisma.user.update({
		data: {
			...body,
		},
		where: {
			id,
		},
	});

	if (!user) {
		return res
			.status(400)
			.send({ success: true, message: 'Unable to update user' });
	}

	return res
		.status(204)
		.send({ success: true, message: 'User updated successfully' });
});

export default Users;
