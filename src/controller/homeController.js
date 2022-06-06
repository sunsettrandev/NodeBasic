import multer from 'multer';
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

let getUploadFilePage = async (req, res) => {
  return res.render('uploadFile.ejs');
}

const upload = multer().single('profile_pic');

let handleUploadFile = async (req, res) => {
  //profile-pic  is the name of our file field in the HTML form
  upload(req, res, function (err) {
    //req.file contains information of uploaded file
    //req.body contains information of text fields, if there were any

    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    }
    else if (!req.file) {
      return res.send('Please select an image to upload');
    }
    else if (err instanceof multer.MulterError) {
      return res.send(err);
    }

    //display uploaded image for user validation
    res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500" /><a href="/upload">Upload another image</a>`);

  });
}

module.exports = {
  getHomePage, getDetailPage, createNewUser, deleteUser, getEditUser, updateUser, getUploadFilePage,
  handleUploadFile
}