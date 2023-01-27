import { app } from './app';
import { createServer } from 'http';
import { Server } from 'socket.io';

const server = createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
	socket.on('room', (message: string) => {
		socket.join(message);
	});
});

server.listen(3333, () => {
	console.log('Running!!');
});
