const r = require('rethinkdb');

const config = {
  host: 'localhost',
  port: 28015,
  authKey: '',
  db: 'rethinkdb_test'
};

function createTables(conn) {
  console.log('Creating tables');
  return r.dbCreate(config.db).run(conn)
     // if db already exists creating tables anyway
    .finally(() => r.tableCreate('todos').run(conn))
    .finally(() => r.table('todos').indexCreate('createdAt').run(conn))
    .finally(() => r.table('todos').indexWait('createdAt').run(conn))
    .then(result => conn)
    .error(err => conn);
}

function verifyTables(conn) {
  return r.table('todos').indexWait('createdAt').run(conn)
}

const connect = new Promise((resolve, reject) => {
  r.connect(config)
   .then(conn => {
      // Verify if the table is created
      verifyTables(conn)
        .then((err, result) => {
          console.log('Tables and indexes available');
          resolve(conn);
        })
        // If tables aren't found create them
        .error(() => createTables(conn).then(() => resolve(conn)))
    })
    .catch(err => reject(err));
});

module.exports = {
  getConnection: () => connect
};
