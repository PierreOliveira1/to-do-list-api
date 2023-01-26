import { User } from '@dtos/user';
import { NextFunction, Request, Response } from 'express';
import { z, ZodError } from 'zod';
import { mapIssues } from '../utils/mapIssues';

async function updateValidator(req: Request, res: Response, next: NextFunction) {
	const body: User = req.body;
	const updateSchema = z.object({
		fullName: z.string().min(1, { message: 'Required full name' }).optional(),
		email: z.string().email({ message: 'Email invalid' }).optional(),
		password: z.string().min(8, { message: 'Password must be at least 8 characters' }).optional(),
	});

	try {
		await updateSchema.parseAsync(body);

		next();
	} catch (error) {
		if (error instanceof ZodError) {
			return res
				.status(400)
				.send({
					error: true,
					issues: mapIssues(error),
				});
		}

		return res
			.status(500)
			.send({ error: true, message: 'Internal server error' });
	}
}

export { updateValidator };
