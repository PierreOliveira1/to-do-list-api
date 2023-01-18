import { Router } from 'express';

const Test = Router();

Test.get('/', (req, res) => {
	res.send({ success: true, message: 'Running!' });
});

export default Test;
