import config from '../config';
import r from 'rethinkdb';

let connection;

/**
 *
 * @return {Connection} connection
 */
export default async function () {
  if (!connection) {
    connection = await r.connect(config.db);
  }

  return connection;
}
