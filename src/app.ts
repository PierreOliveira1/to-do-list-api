import express from 'express';
import { Routes } from './routes';

const app = express();

app.use('/', Routes);

app.get('/', (req, res) => {
	res.send({ success: true });
});

export { app };
