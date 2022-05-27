import pool from '../configs/connectDB';

let getHomePage = async (req, res) => {
  //logic
  // let data = [];

  // connection.query(
  //   'SELECT * FROM `users`',
  //   function (err, results, fields) {
  //     data = results;
  //     return res.render('index.ejs', { dataUser: data });
  //   }
  // );

  const [row, fields] = await pool.execute('SELECT * FROM `users`');
  return res.render('index.ejs', { dataUser: row });
  console.log("check row:", row)

}

let getDetailPage = async (req, res) => {
  let id = req.params.userId;
  let [user] = await pool.execute('SELECT * FROM `users` WHERE id = ?', [id]);
  return res.send(JSON.stringify(user))
}

module.exports = {
  getHomePage, getDetailPage
}