import { prisma } from '@database';
import { ResponseUserId } from '@dtos/responseUserId';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Request } from 'express';

async function del(req: Request, res: ResponseUserId) {
	const id: string = req.params.id;
	const userId: string = res.locals.userId;

	try {
		const room = await prisma.room.findUnique({ where: { id }, include: { users: true } });

		if (!room) {
			return res
				.status(400)
				.send({
					error: true,
					message: 'This room does not exist',
				});
		}

		if (userId !== room.owner) {
			return res
				.status(400)
				.send({
					error: true,
					message: 'Only the owner can delete the room',
				});
		}

		await prisma.room.delete({
			where: {
				id,
			},
		});

		return res
			.status(200)
			.send({ success: true, message: 'Room deleted successfully' });
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			return res
				.status(400)
				.send({
					error: true,
					message: 'Error deleting room',
				});
		}

		return res
			.status(500)
			.send({ error: true, message: 'Internal server error' });
	}
}

export { del };
