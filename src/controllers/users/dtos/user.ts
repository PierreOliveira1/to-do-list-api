import { ToDoList } from '@dtos/toDoList';

export interface User {
	id?: string;
	fullName: string;
	email: string;
	password: string;
	toDoList?: ToDoList[];
}
