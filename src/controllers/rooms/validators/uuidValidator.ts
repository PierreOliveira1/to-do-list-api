import { mapIssuesZodError } from '@utils/mapIssuesZodError';
import { NextFunction, Request, Response } from 'express';
import { z, ZodError } from 'zod';

async function uuidValidator(req: Request, res: Response, next: NextFunction) {
	const id: string = req.params.id;

	const idSchema = z.string().uuid({ message: 'UUID invalid' });

	try {
		await idSchema.parseAsync(id);

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

export { uuidValidator };
