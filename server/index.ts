// import {Db} from './models/db'
import express,{Request,Response,NextFunction,Application} from 'express';
import mysql from 'mysql'
import bodyParser from 'body-parser';
import logger from './logger';
import config from './config/config'
import homeRouter from './router/homeRouter'
import {Db} from './models/db'
import path from 'path';

const NAMESPACE = 'SERVER'

const main = async () => {
    await Db.init();
    const app:Application = express()
    /** Logging the request */
    app.use((req:Request,res:Response,next:NextFunction)=>{
        logger.info(`${NAMESPACE}`,` [METHOD]: ${req.method} using ${req.url} on ${req.socket.remoteAddress}`)

        res.on('finish',()=>{
            logger.info(`${NAMESPACE}`,` [METHOD]: ${req.method} using \
            ${req.url} on ${req.socket.remoteAddress},[STATUS]:${res.statusCode}`)    
        })
        next();
    })
    /** Views */
    .use(express.static(path.join(__dirname,'public')))
    /** Body Parsing */
    .use(bodyParser.urlencoded({extended:false}))
    .use(bodyParser.json())
    /** Roules of API */
    .use((req:Request,res:Response,next:NextFunction)=>{
        res.header('Access-Control-Allow-Origin','*');
        res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept,Authorization',)
        
        if(req.method == 'OPTIONS'){
            res.header('Access-Control-Allow-Methods','GET PATCH DELETE POST PUT')
            return res.status(200).json({});
        }
        next();
    })
    /** Routes */
    .use('/',homeRouter)
    /** Error Handling */
    .use((req:Request,res:Response,next:NextFunction)=>{
        const err = new Error('Not Found')

        return res.status(404).json({
            message:err.message
        })
    })
    /** Creating a server */
    .listen(config.server.port,()=>{
        logger.info(NAMESPACE,`Server is running on ${config.server.host}:${config.server.port}`)
    })
}

main().then(()=>{
    logger.info(`${NAMESPACE}`,'Starting')
    })
      .catch((err)=>logger.error(`${NAMESPACE}`,`${err}`,'App Crashed'));

