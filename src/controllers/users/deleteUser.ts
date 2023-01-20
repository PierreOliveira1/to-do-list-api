import { prisma } from '@database';
import { ResponseUserId } from '@dtos/responseUserId';
import { Request } from 'express';

async function deleteUser(req: Request, res: ResponseUserId) {
	const id = res.locals.userId;

	try {
		await prisma.user.delete({
			where: {
				id,
			}
		});

		return res.status(200);
	} catch(err) {
		console.log(err);
		return res
			.status(400)
			.send({ error: true, message: 'Error deleting user' });
	}
}

export { deleteUser };
