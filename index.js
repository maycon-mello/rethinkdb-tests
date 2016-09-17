const r = require('rethinkdb');
const db = require('./database');

function onConnect(conn) {
  console.log('Connected');

}

function onError() {
  console.log('Connection error');
}

db.getConnection().then(onConnect).catch(onError);
