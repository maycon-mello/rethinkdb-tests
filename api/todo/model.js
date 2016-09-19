import { r, getConnection } from '../../database';

export async function create(todo) {
  let conn = await getConnection();
  todo.createdAt = r.now();
  let result = await r.table('todos').insert(todo, {returnChanges: true}).run(conn);
  return result.changes[0].new_val;
}

export async function getById(id) {
  let conn = await getConnection();

  let result = await r.table('todos').get(id).run(conn);
  return result;
}

export async function remove(id) {
  let conn = await getConnection();

  let result = await r.table('todos').get(id).delete().run(conn);
  return result;
}

export async function getList({value, limit, skip, orderBy}) {
  let conn = await getConnection();
  let selector = r.table('todos');
  let filter = {};

  if (value) {
    filter = todo => todo('value').match(value);
  }

  selector = selector.filter(filter);

  if (orderBy) {
    selector = selector.orderBy(orderBy);
  }

  if (skip) {
    selector = selector.skip(skip);
  }

  if (limit) {
    selector = selector.limit(limit);
  }

  let cursor = await selector.run(conn);

  return await cursor.toArray();
}
