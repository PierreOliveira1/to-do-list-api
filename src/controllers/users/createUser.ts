import { prisma } from '@database';
import { User } from '@dtos/user';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { generateToken } from '@utils/generateToken';
import { generateRefreshToken } from '@utils/generateRefreshToken';

async function createUser(req: Request, res: Response) {
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
			createdAt: new Date(),
			updatedAt: new Date(),
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
		.send({
			success: true,
			message: 'User created successfully',
			token,
			refreshToken,
			user: {
				id: user.id,
				fullName: user.fullName,
				email: user.email,
			},
		});
}

export { createUser };
