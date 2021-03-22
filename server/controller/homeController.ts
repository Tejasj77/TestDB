import {Request,Response,Application,NextFunction} from 'express'
// import { Connect,Query } from '../config/mysql'
import logger from '../logger';
import { Db } from '../models/db';


let NAMESPACE = 'Books';

const getAllBooks =async  (req:Request,res:Response,next:NextFunction)=>{
    // let query = 'SELECT * from books'
    // logger.info(`${NAMESPACE}`,'Getting homepage')
    const result = await Db.books.getTShirt()
    logger.info(`${NAMESPACE}`,'Getting homepage')
    console.log(result)
    res.status(200).json({
        message:result
    });
    // Query(connection,query).then((result)=>{
    //     res.status(200).json({
    //         message:result
    //     })
    // })
    // Query(connection,query).then((result)=>{
        //     logger.info(`${NAMESPACE}`,'Retrieved Books')

        //     return res.status(200).json({
        //         result
        //     })
        //     }).catch((err)=>{
        //         logger.error(`${NAMESPACE}`,err.message,err)

        //         return res.status(500).json({
        //             message:err.message,
        //             error:err                
        //         })
        //     })
    
    // })
}
const createBooks = (req:Request,res:Response,next:NextFunction)=>{
    // let {author,title} = req.body
    let query = `INSERT INTO Books (author,title) VALUES('Dan Brown','The Da Vinci Code')`
    res.status(200).json();
    // Connect().then((connection)=>{
    //     logger.info(`${NAMESPACE}`,'Connection has been established')
    //     Query(connection,query).then((result)=>{
    //         res.status(200).json({
    //             message:result
    //         })
    //     })
        // Query(connection,query).then((result)=>{
        //     logger.info(`${NAMESPACE}`,'Book inserted')

        //     return res.status(200).json({
        //         result
        //     })}).catch((err)=>{
        //         return res.status(500).json({
        //             message:err.message,
        //             error:err
        //         })
        //     })
        // })
            //  .catch((err)=>{
            //      logger.error(`${NAMESPACE}`,err.message,err)

            //      return res.status(500).json({
            //          message:err.message,
            //          error:err
            //      })
            //  })

}

export default {
    getAllBooks,
    createBooks
}
