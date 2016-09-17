const db = require('./database');

async function connect() {
  try {
    const r = await db.getDatabase();
  } catch (err) {
    console.log(err);
  }
}

connect();
