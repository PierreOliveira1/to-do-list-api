import { prisma } from '@database';
import { ResponseUserId } from '@dtos/responseUserId';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Request } from 'express';
import { Room } from '../dto/room';

async function update(req: Request, res: ResponseUserId) {
	const id: string = req.params.id;
	const body: Room = req.body;
	const userId = res.locals.userId;

	try {
		const room = await prisma.room.findUnique({
			where: {
				id,
			},
		});

		if (!room) {
			return res
				.status(400)
				.send({
					error: true,
					message: 'This room does not exist',
				});
		}

		if (userId !== room.owner) {
			return res
				.status(400)
				.send({
					error: true,
					message: 'The can only be updated by the owner',
				});
		}

		await prisma.room.update({
			where: {
				id,
			},
			data: {
				...body,
				updatedAt: new Date(),
			},
		});

		return res
			.status(200)
			.send({ success: true, message: 'Room updated successfully' });
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			return res
				.status(400)
				.send({
					error: true,
					message: 'Error when updating room',
				});
		}

		return res
			.status(500)
			.send({ error: true, message: 'Internal server error' });
	}
}

export { update };
