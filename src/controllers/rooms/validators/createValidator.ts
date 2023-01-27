import { mapIssuesZodError } from '@utils/mapIssuesZodError';
import { NextFunction, Request, Response } from 'express';
import { z, ZodError } from 'zod';
import { Room } from '../dto/room';

async function createValidator(req: Request, res: Response, next: NextFunction) {
	const body: Room = req.body;

	const createSchema = z.object({
		name: z.string().min(1, { message: 'Name empty' }),
	});

	try {
		await createSchema.parseAsync(body);

		next();
	} catch (error) {
		if (error instanceof ZodError) {
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

export { createValidator };
