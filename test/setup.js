import { initDB } from '../database';

/**
 * Connect database
 *
 */
before(async () => {
  console.log("Init db");
  await initDB();
});
