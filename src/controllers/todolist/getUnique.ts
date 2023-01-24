import { prisma } from '@database';
import { Request, Response } from 'express';

async function getUnique(req: Request, res: Response) {
	const id = req.params.id;

	const task = await prisma.toDoList.findUnique({
		where: {
			id,
		},
	});

	if (!task) {
		return res
			.status(400)
			.send({ error: true, message: 'This task does not exist' });
	}

	return res
		.status(200)
		.send(task);
}

export { getUnique };
