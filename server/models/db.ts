import mysql from 'mysql'
import config from '../config/config'
import util from 'util'
import logger from '../logger'
import { Books } from './Books'
import { initMySQLconnection } from '../config/mysql'


export class Db {
    static books:Books
    static async init() {
            logger.info('[DATABASE]','Initializing Database')
            const dbConn = await initMySQLconnection()
            Db.books = new Books(dbConn)
            
            // await queryPr('CREATE DATABASE IF NOT EXISTS Authors');
            // await endPr();
        }
}
    
// connection.connect((error)=>{
//     if(error){
//         reject(error)
//         return;
//     }
//     resolve(connection);
// })


const Query = async (connection:any,query:string) => {
        const connectPr = util.promisify(connection.connect).bind(connection)
        const queryPr = util.promisify(connection.query).bind(connection)
        const endPr = util.promisify(connection.end).bind(connection)
        const result = await queryPr(query);
        await endPr();
        return result
}
    // new Promise<mysql.Connection>((resolve,reject)=> {
    //     connection.query(query,connection,(error,result)=>{
    //         if(error){
    //             reject(error)
    //             return;
    //         }
    //         resolve(result);
    //     })
    // })

export { Query }