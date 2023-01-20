import { Response } from 'express';

export interface ResponseUserId extends Response {
	locals: {
		userId: string;
	}
}
