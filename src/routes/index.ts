import { Router } from 'express';
import path from 'node:path';
import fs from 'node:fs';

const Routes = Router();

const pathControllers = path.join(__dirname, '../controllers');

const controllers = fs.readdirSync(pathControllers);

controllers.forEach(async (dir: string) => {
	const { default: controller } = await import(`${pathControllers}/${dir}`);

	Routes.use(`/${dir}`, controller);
});

export { Routes };
