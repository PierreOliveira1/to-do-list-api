import { prisma } from '@database';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Request, Response } from 'express';

async function unique(req: Request, res: Response) {
	const id = req.params.id;

	try {
		const room = await prisma.room.findUnique({
			where: {
				id,
			},
			include: {
				users: true,
			},
		});

		if (!room) {
			return res
				.status(400)
				.send({ error: true, message: 'Room does not exist' });
		}

		return res
			.status(200)
			.send(room);
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			return res
				.status(400)
				.send({
					error: true,
					message: 'Error when fetching room',
				});
		}

		return res
			.status(500)
			.send({ error: true, message: 'Internal server error' });
	}
}

export { unique };
