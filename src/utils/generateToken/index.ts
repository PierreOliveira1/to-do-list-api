import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@config/envs';

function generateToken(userId: string) {
	const token = jwt.sign({
		id: userId,
	}, JWT_SECRET, {
		expiresIn: 1000 * 60 * 60 * 5,
	});

	return token;
}

export { generateToken };
