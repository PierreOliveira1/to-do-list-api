import { prisma } from '@database';
import { Request, Response } from 'express';
import { z } from 'zod';

async function unique(req: Request, res: Response) {
	const id = req.params.id;

	const idSchema = z.string().uuid({ message: 'UUID invalid' });

	await idSchema.parseAsync(id)
		.catch((error) => {
			return res
				.status(400)
				.send(error);
		});

	try {
		const room = await prisma.room.findUnique({
			where: {
				id,
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
	} catch (err) {
		return res
			.status(500)
			.send({ error: true, message: 'Internal server error' });
	}
}

export { unique };
