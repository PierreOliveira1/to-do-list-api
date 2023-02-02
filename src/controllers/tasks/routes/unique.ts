import { prisma } from '@database';
import { Request, Response } from 'express';
import { z } from 'zod';

async function unique(req: Request, res: Response) {
	const id = req.params.id;

	const idSchema = z.string().uuid({ message: 'UUID invalid' });

	await idSchema
		.parseAsync(id)
		.catch((err) => {
			return res.status(400).send(err);
		});

	try {
		const task = await prisma.task.findUnique({
			where: {
				id,
			},
		});

		if (!task) {
			return res
				.status(400)
				.send({ error: true, message: 'This task does not exist' });
		}

		return res
			.status(200)
			.send(task);
	} catch (err) {
		return res
			.status(500)
			.send({ error: true, message: 'Internal server error' });
	}
}

export { unique };
