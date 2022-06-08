import express from 'express'
import configViewEngine from './configs/viewEngine'
import initWebRoute from './route/web'
import initAPIRoute from './route/api'
// import connection from './configs/connectDB'
import morgan from 'morgan'

require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000;
// console.log(port)

app.use((req, res, next) => {
  console.log('>>> Check req');
  console.log(req.method);
  next();
})

//logging
app.use(morgan('combined'))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//setup view engine
configViewEngine(app);

//init web route
initWebRoute(app);

//init api route
initAPIRoute(app);

//handle 404 not found
app.use((req, res) => {
  return res.render('404.ejs');
})

app.listen(port, () => {
  console.log(port);
})