import { mapIssuesZodError } from '@utils/mapIssuesZodError';
import { NextFunction, Request, Response } from 'express';
import { z, ZodError } from 'zod';
import { Room } from '../dto/room';

async function updateValidator(req: Request, res: Response, next: NextFunction) {
	const body: Room = req.body;

	const updateSchema = z.object({
		name: z.string().min(1, { message: 'Name empty' }),
	});

	try {
		await updateSchema.parseAsync(body);

		next();
	} catch (error) {
		if(error instanceof ZodError) {
			return res
				.status(400)
				.send({
					error: true,
					issues: mapIssuesZodError(error),
				});
		}

		return res
			.status(500)
			.send({
				error: true,
				message: 'Internal server error',
			});
	}
}

export { updateValidator };
