import { prisma } from '@database';
import { ResponseUserId } from '@dtos/responseUserId';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Request } from 'express';
import { Room } from '../dto/room';

async function create(req: Request, res: ResponseUserId) {
	const body: Room = req.body;
	const userId: string = res.locals.userId;

	try {
		await prisma.room.create({
			data: {
				...body,
				owner: userId,
				users: {
					connect: {
						id: userId
					}
				},
			},
		});

		return res
			.status(200)
			.send({ success: true, message: 'Room created successfully' });
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			return res
				.status(400)
				.send({
					error: true,
					message: 'Error creating room',
				});
		}

		return res
			.status(500)
			.send({ error: true, message: 'Internal server error' });
	}
}

export { create };
