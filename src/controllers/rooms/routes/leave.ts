import { prisma } from '@database';
import { ResponseUserId } from '@dtos/responseUserId';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Request } from 'express';

async function leave(req: Request, res: ResponseUserId) {
	const id: string = req.params.id;
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

		if (userId === room.owner) {
			return res
				.status(400)
				.send({
					error: true,
					message: 'The owner can only delete the room',
				});
		}

		await prisma.room.update({
			where: {
				id,
			},
			data: {
				users: {
					disconnect: {
						id: userId,
					},
				},
			},
		});

		return res
			.status(200)
			.send({
				success: true,
				message: 'Leave the room successfully',
			});
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			return res
				.status(400)
				.send({
					error: true,
					message: 'Error leaving room',
				});
		}

		return res
			.status(500)
			.send({
				error: true,
				message: 'Internal server error',
			});
	}
}

export { leave };
