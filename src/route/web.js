import express from "express";
import homeController from "../controller/homeController"
let router = express.Router();

const initWebRoute = (app) => {
  router.get('/', homeController.getHomePage)
  router.get('/detail/user/:userId', homeController.getDetailPage)
  router.post('/create-new-user', homeController.createNewUser)
  router.get('/edit-user/:userId', homeController.getEditUser)
  router.post('/update-user', homeController.updateUser)
  router.post('/delete-user', homeController.deleteUser)
  return app.use('/', router)
}

export default initWebRoute;