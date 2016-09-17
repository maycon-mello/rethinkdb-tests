const r = require('rethinkdb');

const config = {
  host: 'localhost',
  port: 28015,
  authKey: '',
  db: 'rethinkdb_test'
};

async function createTables(conn) {
  console.log('Configuring db...');

  try {
    // try to create the database
    await r.dbCreate(config.db).run(conn);
    console.log('Database created.');
  } catch (err) {
    console.log('Database exists.')
  } finally {
    // Create tables and indexes
    await r.tableCreate('todos').run(conn);
    await r.table('todos').indexCreate('createdAt').run(conn);
    await r.table('todos').indexWait('createdAt').run(conn);
    console.log('Tables created.');
  }

}

function verifyTables(conn) {
  return r.table('todos').indexWait('createdAt').run(conn)
}

async function getDatabase () {
  let conn = await r.connect(config);

  try {
    // Verify if the table is created
    await verifyTables(conn);
    console.log('Tables and indexes available');
  } catch (err) {
    // If tables aren't found create them
    await createTables(conn);
  }

  conn.close();

  console.log('Database is ready!');
  return r;
}

module.exports = { getDatabase };
