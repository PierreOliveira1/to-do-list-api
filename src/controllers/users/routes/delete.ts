import { prisma } from '@database';
import { ResponseUserId } from '@dtos/responseUserId';
import { Request } from 'express';

async function del(req: Request, res: ResponseUserId) {
	const id = res.locals.userId;

	const user = await prisma.user.findUnique({
		where: {
			id,
		},
	});

	if (!user) {
		return res
			.status(400)
			.send({ error: true, message: 'This user does not exist' });
	}

	try {
		await prisma.user.delete({
			where: {
				id,
			}
		});

		return res
			.status(200)
			.send({ success: true, message: 'User deleted successfully' });
	} catch(err) {
		return res
			.status(500)
			.send({ error: true, message: 'Internal server error' });
	}
}

export { del };
