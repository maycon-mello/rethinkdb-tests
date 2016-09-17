import { r, getConnection } from '../database';

export async function createTodo(todo) {
  let conn = await getConnection();
  todo.createdAt = r.now();

  await r.table('todos').insert(todo, {returnChanges: true}).run(conn);
}
