import { prisma } from '@database';
import { Request, Response } from 'express';

async function updateUser(req: Request, res: Response) {
	const { id } = req.params;
	const body = req.body;

	const user = await prisma.user.update({
		data: {
			...body,
		},
		where: {
			id,
		},
	});

	if (!user) {
		return res
			.status(400)
			.send({ success: true, message: 'Unable to update user' });
	}

	return res.status(204);
}

export { updateUser };
