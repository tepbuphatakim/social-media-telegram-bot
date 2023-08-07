import Todo from '../models/Todo.js';

export async function create() {
  await Todo.create({ title: 'test', done: false });
  return { success: true };
}
