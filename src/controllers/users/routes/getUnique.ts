import { prisma } from '@database';
import { ResponseUserId } from '@dtos/responseUserId';
import { Request } from 'express';

async function getUnique(req: Request, res: ResponseUserId) {
	const id = res.locals.userId;

	const user = await prisma.user.findFirst({
		where: {
			id,
		}
	});

	if (!user) {
		return res
			.status(400)
			.send({ error: true, message: 'User does not exist' });
	}

	return res
		.status(200)
		.send({ id: user.id, fullName: user.fullName, email: user.email });
}

export { getUnique };
