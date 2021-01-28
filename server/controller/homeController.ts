import {Request,Response,Application,NextFunction} from 'express'
import { Connect,Query } from '../config/mysql'
import logger from '../logger';

let NAMESPACE = 'Books';

const getAllBooks = (req:Request,res:Response,next:NextFunction)=>{
    let query = 'SELECT * from books'
    
    Connect().then((connection)=>{
        Query(connection,query).then((result)=>{
            logger.info(`${NAMESPACE}`,'Retrieved Books')

            return res.status(200).json({
                result
            })
            }).catch((err)=>{
                logger.error(`${NAMESPACE}`,err.message,err)

                return res.status(500).json({
                    message:err.message,
                    error:err                
                })
            })
        })
            .catch((err)=>{
                logger.error(`${NAMESPACE}`,err.message,err)

                return res.status(500).json({
                    message:err.message,
                    error:err
        })
    })
}
const createBooks = (req:Request,res:Response,next:NextFunction)=>{
    let {author,title} = req.body
    let query = `INSERT INTO Books (author,title) VALUES(${author},${title})`
    
    Connect().then((connection)=>{
        Query(connection,query).then((result)=>{
            logger.info(`${NAMESPACE}`,'Book inserted')

            return res.status(200).json({
                result
            })}).catch((err)=>{
                return res.status(500).json({
                    message:err.message,
                    error:err
                })
            })
        })
             .catch((err)=>{
                 logger.error(`${NAMESPACE}`,err.message,err)

                 return res.status(500).json({
                     message:err.message,
                     error:err
                 })
             })

}

export default {
    getAllBooks,
    createBooks
}
