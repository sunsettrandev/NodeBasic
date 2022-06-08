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

let handleUploadFile = async (req, res) => {
  //profile-pic  is the name of our file field in the HTML form

  //req.file contains information of uploaded file
  //req.body contains information of text fields, if there were any

  if (req.fileValidationError) {
    return res.send(req.fileValidationError);
  }
  else if (!req.file) {
    return res.send('Please select an image to upload');
  }

  //display uploaded image for user validation
  res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500" /><a href="/upload">Upload another image</a>`);
}

let handleUploadMutipleFiles = async (req, res) => {

  if (req.fileValidationError) {
    return res.send(req.fileValidationError);
  }
  else if (!req.files) {
    return res.send('Please select an image to upload');
  }

  let result = "You have a uploaded these images: <hr />";
  const files = req.files;

  //loop through all the uploaded images and display them on frontend
  for (let index = 0; index < files.length; index++) {
    result += `<img src="/image/${files[index].filename}" width="500" style="margin-right:20px;">`;
  }
  result += '<hr /> <a href="/upload">Upload more images </a>';
  res.send(result);

}

module.exports = {
  getHomePage, getDetailPage, createNewUser, deleteUser, getEditUser, updateUser, getUploadFilePage,
  handleUploadFile, handleUploadMutipleFiles
}