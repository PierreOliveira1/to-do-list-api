import { Request, Response, Router } from 'express';
import { prisma } from '@database';
import { User } from '@dtos/user';
import { generateToken } from '@utils/generateToken';
import { generateRefreshToken } from '@utils/generateRefreshToken';
import bcrypt from 'bcryptjs';

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

	const hashPassword = await bcrypt.hash(password, 10);

	const user = await prisma.user.create({
		data: {
			email,
			fullName,
			password: hashPassword,
		},
	});

	if(!user) {
		return res
			.status(400)
			.send({ error: true, message: 'Error creating user' });
	}

	const token = generateToken(user.id);
	const refreshToken = await generateRefreshToken(user.id);

	return res
		.status(201)
		.send({ success: true, message: 'User created successfully', token, refreshToken });
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
		.send({ id: user.id, fullName: user.fullName, email: user.email });
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

Users.delete('/:id', async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		await prisma.user.delete({
			where: {
				id,
			}
		});

		return res
			.status(200)
			.send({ success: true, message: 'User deleted successfully' });
	} catch(err) {
		console.log(err);
		return res
			.status(400)
			.send({ error: true, message: 'Error deleting user' });
	}
});

export default Users;
