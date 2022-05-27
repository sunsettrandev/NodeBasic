
import mysql from "mysql2/promise"

//create the connection to DB
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'nodejsbasic'
  // password: 'password'
});

//simple query
// connection.query(
//   'SELECT * FROM `users`',
//   function (err, results, fields) {
//     console.log(results);
//   }
// );

//with placeholder

export default pool;