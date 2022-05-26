import connection from '../configs/connectDB'

let getHomePage = (req, res) => {
  //logic
  let data = [];

  connection.query(
    'SELECT * FROM `users`',
    function (err, results, fields) {
      data = results;
      return res.render('test/index.ejs', { dataUser: JSON.stringify(data) });
    }
  );

}

module.exports = {
  getHomePage
}