import { prisma } from '@database';
import { Request, Response } from 'express';
import { z } from 'zod';

async function update(req: Request, res: Response) {
	const id: string = req.params.id;
	const name: string = req.body.name;

	const updateSchema = z.object({
		name: z.string().min(1, { message: 'Name empty' }),
		id: z.string().uuid({ message: 'UUID invalid' }),
	});

	await updateSchema.parseAsync({ name, id })
		.catch((err) => {
			return res
				.status(400)
				.send(err);
		});

	try {
		await prisma.room.update({
			where: {
				id,
			},
			data: {
				name,
				updatedAt: new Date(),
			},
		});

		return res
			.status(200)
			.send({ success: true, message: 'Room updated successfully' });
	} catch (err) {
		return res
			.status(500)
			.send({ error: true, message: 'Internal server error' });
	}
}

export { update };
