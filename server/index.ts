// import {Db} from './models/db'
import express from 'express';
import bodyParser from 'body-parser';
import logger from './logger';
import config from './config/config'
import homeRouter from './router/homeRouter'

const NAMESPACE = 'SERVER'

async function main(){
    // await Db.init();
    const app = express()
    /** Logging the request */
    .use((req,res,next)=>{
        logger.info(`${NAMESPACE}`,` [METHOD]: ${req.method} using ${req.url} on ${req.socket.remoteAddress}`)

        res.on('finish',()=>{
            logger.info(`${NAMESPACE}`,` [METHOD]: ${req.method} using \
            ${req.url} on ${req.socket.remoteAddress},[STATUS]:${res.statusCode}`)    
        })
        next();
    })
    /** Body Parsing */
    .use(bodyParser.urlencoded({extended:false}))
    .use(bodyParser.json())
    /** Roules of API */
    .use((req,res,next)=>{
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
    .use((req,res,next)=>{
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

main().then(()=>logger.info(`${NAMESPACE}`,'Starting'))
      .catch(()=>logger.error(`${NAMESPACE}`,'App Crashed'));