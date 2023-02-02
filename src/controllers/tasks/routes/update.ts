import { prisma } from '@database';
import { ResponseUserId } from '@dtos/responseUserId';
import { Request } from 'express';

async function update(req: Request, res: ResponseUserId) {
	const id = req.params.id;
	const { message } = req.body;

	try {
		await prisma.task.update({
			where: {
				id,
			},
			data: {
				message,
				updatedAt: new Date(),
			},
		});

		return res.status(204);
	} catch (error) {
		return res
			.status(500)
			.send({ error: true, message: 'Server internal error' });
	}
}

export { update };
