import express from "express";
import { UserController } from "../Controllers/userController";
import { ProviderController } from "../Controllers/providerController";
import { ServiceController } from "../Controllers/servicesController";

const routes = express.Router();

const userController = new UserController();
const providerController = new ProviderController();
const serviceController = new ServiceController();

routes.get('/user', userController.findAll);
routes.get('/user/:id', userController.listId);
routes.post('/user/create', userController.create);
routes.put('/user/update', userController.updateUser);
routes.delete('/user/:id', userController.deleteUser);

routes.get('/provider', providerController.findAll);
routes.get('/provider/:id', providerController.listId);
routes.post('/provider/create', providerController.create);
routes.put('/provider/update', providerController.updateProvider);
routes.delete('/provider/:id', providerController.deleteProvider);

routes.get('/service', serviceController.findAll);
routes.get('/service/:id', serviceController.listId);
routes.post('/service/create', serviceController.create);
routes.put('/service/update', serviceController.updateService);
routes.delete('/service/:id', serviceController.deleteService);

export default routes;