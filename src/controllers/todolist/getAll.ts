import { prisma } from '@database';
import { ResponseUserId } from '@dtos/responseUserId';
import { Request } from 'express';

async function getAll(req: Request, res: ResponseUserId) {
	const id = res.locals.userId;
	const page = Number(req.query.page) || 1;
	const results = Number(req.query.results) || 10;

	const countToDoList = await prisma.toDoList.count();

	const allToDoList = await prisma.toDoList.findMany({
		where: {
			id,
		},
		take: results,
		skip: page !== 1 ? page * results : 0,
	});

	const countPages = Math.floor(countToDoList / results);

	return res
		.status(200)
		.send({
			data: allToDoList,
			pagination: {
				current: page,
				next: countPages !== page && page + 1,
				totalPages: countPages,
			}
		});
}

export { getAll };
