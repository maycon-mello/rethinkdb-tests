import r from 'rethinkdb';
import config, {Logger} from '../config';

const db = config.rethink;

async function migrate (conn) {
  Logger.info('migrate db...');
  try {
    // try to create the database
    await r.dbCreate(db).run(conn);
    Logger.info(`database ${db.db} created.`);
  } catch (err) {
    Logger.info(`database ${db.db} exists.`)
  }

  try {
    // Create tables
    await r.tableCreate('todos').run(conn);
    Logger.info('tables created.');
  } catch (err) {
    Logger.info('Error on creating tabls');
  }

  try {
    // Create indexes
    await r.table('todos').indexCreate('createdAt').run(conn);
    await r.table('todos').indexWait('createdAt').run(conn);
  } catch (err) {
    Logger.info('Error on creating indexes');
  }
}

export default migrate;
