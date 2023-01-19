import { prisma } from '@database';
import { Request, Response } from 'express';

async function getUser(req: Request, res: Response) {
	const { id } = req.params;

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

export { getUser };
