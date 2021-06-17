import { Priority } from './priority';

export class Todo {
  description: string;
  dueDate: Date;
  id: number;
  priorityId: number;
  priority?: Priority;

  constructor(todoLike: Partial<Todo>) {
    if (todoLike) {
      Object.assign(this, todoLike);
    }
  }
}
