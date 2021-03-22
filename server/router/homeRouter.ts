import express,{Request,Response,Application,NextFunction} from 'express'
import homeController from '../controller/homeController'

const Router = express.Router()

Router.get('/',homeController.getAllBooks);
Router.get('/test',homeController.createBooks);

export default Router;