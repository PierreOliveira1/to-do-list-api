import { mapIssuesZodError } from '@utils/mapIssuesZodError';
import { NextFunction, Request, Response } from 'express';
import { z, ZodError } from 'zod';
import { User } from '../dtos/user';

async function createValidator(req: Request, res: Response, next: NextFunction) {
	const body: User = req.body;
	const userSchema = z.object({
		email: z.string().email({ message: 'Email invalid' }),
		fullName: z.string().min(1, { message: 'Required full name' }),
		password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
	});

	try {
		await userSchema.parseAsync(body);

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
			.send({ error: true, message: 'Internal server error' });
	}
}

export { createValidator };
