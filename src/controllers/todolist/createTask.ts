import { prisma } from '@database';
import { ResponseUserId } from '@dtos/responseUserId';
import { Request } from 'express';
import { z } from 'zod';

async function createTask(req: Request, res: ResponseUserId) {
	const message: string = req.body.message;
	const userId = res.locals.userId;

	const taskValuesSchema = z.object({
		message: z.string({  }),
		userId: z.string().uuid(),
	});

	const taskValues = taskValuesSchema.parse({ message, userId });

	const task = await prisma.toDoList.create({
		data: {
			...taskValues,
		},
	});


	if (!task) {
		return res
			.status(500)
			.send({ error: true, message: '' });
	}
}

export { createTask };
