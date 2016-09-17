import r from 'rethinkdb';
import config, {Logger} from '../config';

async function migrate (conn) {
  Logger.info('migrate db...');
  try {
    // try to create the database
    await r.dbCreate(config.db).run(conn);
    Logger.info('database created.');
  } catch (err) {
    Logger.info('database exists.')
  } finally {
    // Create tables and indexes
    await r.tableCreate('todos').run(conn);
    await r.table('todos').indexCreate('createdAt').run(conn);
    await r.table('todos').indexWait('createdAt').run(conn);
    Logger.info('tables created.');
  }
}

export default migrate;
