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

}

let getDetailPage = async (req, res) => {
  let id = req.params.userId;
  let [user] = await pool.execute('SELECT * FROM `users` WHERE id = ?', [id]);
  return res.send(JSON.stringify(user));
}

let createNewUser = async (req, res) => {
  let { firstName, lastName, email, address } = req.body
  await pool.execute('insert into users(firstName, lastName, email, address) value(?,?,?,?)',
    [firstName, lastName, email, address])
  return res.redirect('/')
}

let deleteUser = async (req, res) => {
  let userId = req.body.userId;
  await pool.execute('delete from users where id = ?', [userId]);
  return res.redirect('/');
}

let getEditUser = async (req, res) => {
  let userId = req.params.userId;
  let [user] = await pool.execute('select * from `users` where id = ?', [userId]);
  return res.render('update.ejs', { dataUser: user[0] });
}

let updateUser = async (req, res) => {
  let { firstName, lastName, email, address, id } = req.body
  await pool.execute('update users set firstName = ?, lastName = ?, email = ?, address = ? where id = ?',
    [firstName, lastName, email, address, id]);
  return res.redirect('/');
}

module.exports = {
  getHomePage, getDetailPage, createNewUser, deleteUser, getEditUser, updateUser
}