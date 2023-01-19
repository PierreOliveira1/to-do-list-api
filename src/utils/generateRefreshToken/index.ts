import { prisma } from '@database';
import dayjs from 'dayjs';

async function generateRefreshToken(userId: string, id = '') {
	const expiresIn = dayjs().add(1, 'D').unix();

	const refreshTokenAlreadyExists = await prisma.refreshToken.findUnique({
		where: {
			id,
		},
	});

	if (refreshTokenAlreadyExists) {
		await prisma.refreshToken.delete({ where: { id } });
	}

	await deleteAllRefreshTokenExpired(userId);

	const refreshToken = await prisma.refreshToken.create({
		data: {
			userId,
			expiresIn,
		},
	});

	return refreshToken;
}

async function deleteAllRefreshTokenExpired(userId: string) {
	await prisma.refreshToken.deleteMany({
		where: {
			userId,
			AND: {
				expiresIn: {
					gte: dayjs().add(2, 'D').unix(),
				}
			}
		}
	});
}

export { generateRefreshToken };
