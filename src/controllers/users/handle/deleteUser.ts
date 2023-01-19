import { prisma } from '@database';
import { Request, Response } from 'express';

async function deleteUser(req: Request, res: Response) {
	const { id } = req.params;

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
