import mysql from 'mysql'
import config from './config'

const params = {
    user:config.mysql.host,
    password:config.mysql.password,
    database:config.mysql.db,
    port:config.mysql.port
}

const Connect = async () => 
    new Promise<mysql.Connection>((resolve,reject) => {
        const connection = mysql.createConnection(params);

        connection.connect((error)=>{
            if(error){
                reject(error)
                return;
            }
            resolve(connection);
        })
})

const Query = async(connection:mysql.Connection,query:string) => 
    new Promise<mysql.Connection>((resolve,reject)=> {
        connection.query(query,connection,(error,result)=>{
            if(error){
                reject(error)
                return;
            }
            resolve(result);
        })
    })

export { Connect , Query }