import express from 'express';
import { Routes } from '@routes';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', Routes);

app.get('/', (req, res) => {
	res.send({ success: true });
});

export { app };
