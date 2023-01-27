import { prisma } from '@database';
import { ResponseUserId } from '@dtos/responseUserId';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Request } from 'express';

async function connect(req: Request, res: ResponseUserId) {
	const id: string = req.params.id;
	const userId: string = res.locals.userId;

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

		await prisma.room.update({
			where: {
				id,
			},
			data: {
				users: {
					connect: {
						id: userId,
					},
				},
			},
		});

		return res
			.status(200)
			.send({
				success: true,
				message: 'Entered the room successfully',
			});
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			return res
				.status(400)
				.send({
					error: true,
					message: 'Error entering the room',
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

export { connect };
