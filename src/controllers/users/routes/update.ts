import { prisma } from '@database';
import { ResponseUserId } from '@dtos/responseUserId';
import { User } from '@dtos/user';
import { Request } from 'express';

async function update(req: Request, res: ResponseUserId) {
	const id = res.locals.userId;
	const body: User = req.body;

	const user = await prisma.user.findUnique({ where: { id } });

	if (!user) {
		return res
			.status(400)
			.send({ error: true, message: 'This user does not exist' });
	}

	try {
		await prisma.user.update({
			data: {
				...body,
			},
			where: {
				id,
			},
		});

		return res
			.status(200)
			.send({ success: true, message: 'User updated successfully' });
	} catch (error) {
		return res
			.status(500)
			.send({ error: true, message: 'Internal server error' });
	}
}

export { update };
