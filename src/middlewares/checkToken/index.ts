import { JWT_SECRET } from '@config/envs';
import { ResponseUserId } from '@dtos/responseUserId';
import { NextFunction, Request } from 'express';
import jwt from 'jsonwebtoken';

type DecodedToken = {
	id: string;
}

function checkToken(req: Request, res: ResponseUserId, next: NextFunction) {
	const authorization = req.headers.authorization;

	if (authorization) {
		const [bearer, token] = authorization.split(' ');

		if (!/Bearer/gi.test(bearer) || !token) {
			return res
				.status(400)
				.send({ error: true, message: 'Badly formatted token' });
		}

		try {
			const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;

			res.locals.userId = decoded.id;

			next();
		} catch (err) {
			return res
				.status(400)
				.send({ error: true, message: 'Token invalid' });
		}

	}
}

export { checkToken };
