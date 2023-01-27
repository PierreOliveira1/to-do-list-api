import { prisma } from '@database';
import { ResponseUserId } from '@dtos/responseUserId';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Request } from 'express';

async function all(req: Request, res: ResponseUserId) {
	const id = res.locals.userId;

	try {
		const rooms = await prisma.room.findMany({
			where: {
				users: {
					every: {
						id,
					},
				},
			},
		});

		return res
			.status(200)
			.send(rooms);
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			return res
				.status(400)
				.send({
					error: true,
					message: 'Error fetching all rooms',
				});
		}

		return res
			.status(500)
			.send({
				error: true,
				message: 'Internal server error'
			});
	}
}

export { all };
