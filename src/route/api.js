import express from "express";
import APIController from "../controller/APIController"

let router = express.Router();

const initAPIRoute = (app) => {
  router.get('/users', APIController.getAllUser); //Read data
  router.post('/create-user', APIController.createNewUser); //Create data
  router.put('/update-user', APIController.updateUser);//Update data
  router.delete('/delete-user/:id', APIController.deleteUser);//Delete data

  return app.use('/api/v1', router)
}

export default initAPIRoute;