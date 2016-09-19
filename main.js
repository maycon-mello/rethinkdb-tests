import { r, initDB, getConnection } from './database';
import { app, io } from './server';

initialize();

async function listenChanges() {
  let conn = await getConnection();
  let cursor = await r.table('todos').changes().run(conn);

  cursor.each((err, data) => {
    io.sockets.emit('update', data.new_val);
  });
}

/**
 *
 * Initialize de database and crate todos
 */
export async function initialize() {
  try {
    await initDB();
  } catch (err) {
    console.log(err);
  }

  listenChanges();

  return app;
}

// /**
//  *
//  * Create a random todo
//  */
// async function createTodo() {
//   let todo = await Todo.createTodo({
//     value: 'Test 1'
//   });
//
//   console.log('Todo created');
// }
