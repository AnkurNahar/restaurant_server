const util = require( 'util' );
var mysql = require('mysql');

var config = {
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'restaurant'
};


function makeDb( config ) {
    const connection = mysql.createConnection( config );
    return {
      query( sql, args ) {
        return util.promisify( connection.query )
          .call( connection, sql, args );
      },
      close() {
        return util.promisify( connection.end ).call( connection );
      }
    };
  }

const db = makeDb(config);

module.exports = db;

