import { prisma } from '@database';
import { ResponseUserId } from '@dtos/responseUserId';
import { Request } from 'express';
import { z } from 'zod';

async function create(req: Request, res: ResponseUserId) {
	const name: string = req.body.name;
	const userId: string = res.locals.userId;

	const createSchema = z.object({
		name: z.string().min(1, { message: 'Name empty' }),
		userId: z.string().uuid({ message: 'UUID invalid' }),
	});

	await createSchema.parseAsync({ name, userId })
		.catch((err) => {
			return res
				.status(400)
				.send(err);
		});

	try {
		await prisma.room.create({
			data: {
				name,
				users: {
					connect: {
						id: userId
					}
				},
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		});

		return res
			.status(200)
			.send({ success: true, message: 'Room created successfully' });
	} catch (err) {
		return res
			.status(500)
			.send({ error: true, message: 'Internal server error' });
	}
}

export { create };
