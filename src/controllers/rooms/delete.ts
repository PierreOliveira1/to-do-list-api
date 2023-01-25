import { prisma } from '@database';
import { ResponseUserId } from '@dtos/responseUserId';
import { Request } from 'express';
import { z } from 'zod';

async function del(req: Request, res: ResponseUserId) {
	const id: string = req.params.id;
	const userId: string = res.locals.userId;

	const idSchema = z.string().uuid({ message: 'UUID invalid' });

	await idSchema.parseAsync(id)
		.catch((err) => {
			return res
				.status(400)
				.send(err);
		});

	try {
		const room = await prisma.room.findUnique({ where: { id }, include: { users: true } });

		const users = room?.users.length ?? 1;

		if(users > 1) {
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
		} else {
			await prisma.room.delete({
				where: {
					id,
				},
			});
		}

		return res
			.status(200)
			.send({ success: true, message: 'Room deleted successfully' });
	} catch (err) {
		return res
			.status(500)
			.send({ error: true, message: 'Internal server error' });
	}
}

export { del };
