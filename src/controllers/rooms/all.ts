import { prisma } from '@database';
import { ResponseUserId } from '@dtos/responseUserId';
import { Request } from 'express';
import { z } from 'zod';

async function all(req: Request, res: ResponseUserId) {
	const id = res.locals.userId;
	const idSchema = z.string().uuid({ message: 'UUID invalid' });

	await idSchema.parseAsync(id)
		.catch((error) => {
			return res
				.status(400)
				.send(error);
		});

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
	} catch (err) {
		return res
			.status(500)
			.send({ error: true, message: 'Internal server error' });
	}
}

export { all };
