import r from 'rethinkdb';
import getConnection from './getConnection';
import migrate from './migrate';
import {Logger} from '../config';

async function initDB() {
  let conn = await getConnection();

  try {
    // Verify if tables exists
    await verifyTables(conn);
    Logger.info('tables and indexes available');
  } catch (err) {
    console.log(err);
    // If tables isn't found create them
    await migrate(conn);
  }

  Logger.info('database is ready!');
}

function verifyTables(conn) {
  return r.table('todos').indexWait('createdAt').run(conn)
}

export default initDB;
