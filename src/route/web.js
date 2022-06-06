import express from "express";
import homeController from "../controller/homeController"
import path from "path";
import multer from "multer";
var appRoot = require('app-root-path');
let router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('>>>check appRoot: ', appRoot);
    cb(null, appRoot + "/src/public/image/");
  },
  //by default, multer removes file extension so let's add them back
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const imageFilter = function (req, file, cb) {
  //accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
}

const upload = multer({ storage: storage, fileFilter: imageFilter });

const initWebRoute = (app) => {
  router.get('/', homeController.getHomePage)
  router.get('/detail/user/:userId', homeController.getDetailPage)
  router.post('/create-new-user', homeController.createNewUser)
  router.get('/edit-user/:userId', homeController.getEditUser)
  router.post('/update-user', homeController.updateUser)
  router.post('/delete-user', homeController.deleteUser)
  router.get('/upload', homeController.getUploadFilePage)
  router.post('/upload-profile-pic', upload.single('profile_pic'), homeController.handleUploadFile)
  return app.use('/', router)
}

export default initWebRoute;