import express,{Request,Response,Application,NextFunction} from 'express'
import homeController from '../controller/homeController'

const Router = express.Router()

Router.get('/',homeController.home);
Router.get('/test',homeController.test);

export default Router;