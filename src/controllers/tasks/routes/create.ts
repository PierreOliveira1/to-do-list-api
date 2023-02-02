import { prisma } from '@database';
import { ResponseUserId } from '@dtos/responseUserId';
import { Request } from 'express';
import { z } from 'zod';

async function create(req: Request, res: ResponseUserId) {
	const message: string = req.body.message;
	const userId: string = res.locals.userId;

	const taskValuesSchema = z.object({
		message: z.string().min(1, {
			message: 'Message empty'
		}),
		userId: z.string().uuid({ message: 'UUID invalid' }),
	});

	const taskValues = await taskValuesSchema
		.parseAsync({ message, userId })
		.catch((err) => {
			res.status(400).send(err);
		});

	try {
		if(taskValues) {
			await prisma
				.task
				.create({
					data: {
						...taskValues,
						createdAt: new Date(),
						updatedAt: new Date(),
					},
				});
		}

		return res.status(200).send({ success: true, message: 'Task created successfully' });
	} catch(err) {
		return res
			.status(500)
			.send({ error: true, message: 'Internal server error' });
	}
}

export { create };
