import { prisma } from '@database';
import { ResponseUserId } from '@dtos/responseUserId';
import { Request } from 'express';

async function getAll(req: Request, res: ResponseUserId) {
	const id = res.locals.userId;
	const page = Number(req.query.page) || 1;
	const results = Number(req.query.results) || 10;

	const countTasks = await prisma.task.count();

	const allTask = await prisma.task.findMany({
		where: {
			id,
		},
		take: results,
		skip: page !== 1 ? page * results : 0,
	});

	const totalPages = Math.ceil(countTasks / results);

	return res
		.status(200)
		.send({
			data: allTask,
			pagination: {
				current: page,
				next: totalPages !== page && page + 1,
				total: totalPages,
			}
		});
}

export { getAll };
