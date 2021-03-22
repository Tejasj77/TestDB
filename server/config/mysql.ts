import fs from 'fs'
import mysql from 'mysql'
import config from './config'
import util from 'util'
import logger from '../logger'
import { resolve } from 'path'
import stream from 'stream'


let params = {
    host:config.mysql.host,
    user:config.mysql.user,
    password:config.mysql.password,
    database:config.mysql.db,
    port:config.mysql.port,
    // host:'localhost',
    // user:'newest',
    // password:'qwerty',
    // database:'mydb',
    // port:3306,
    multipleStatements:true
}

console.log(params.port);
const readFile = util.promisify(fs.readFile);
function toCamelCase(row:any) {
    const mod: any = {};
    for(const key of Object.keys(row)){
        const camelKey = key.replace(/_([a-z])/g, (chars) => chars[1].toUpperCase());
        mod[camelKey] = row[key]
    }
    return mod;
}

interface QueryResponse {
    fieldCount? : number;
    affectedRows? : number;
    insertId?: number;
    changedRows?: number
}

export interface IDbUtils {
    query(sql:string,param?:any[]): Promise<QueryResponse>;
    getRows(sql:string, param?:any[]) : Promise<any[]>;
    stream(sql:string,param?:any[]) : stream.Readable;
}

export async function initMySQLconnection(){
    const schemaSQL = await readFile('./server/data/schema.sql','utf-8')
    const conn = mysql.createConnection(params)
    const connectPr = util.promisify(conn.connect).bind(conn);
    const queryPr = util.promisify(conn.query).bind(conn);
    const endPr = util.promisify(conn.end).bind(conn);
    await connectPr();
    await queryPr(schemaSQL)
    await endPr();
    
    const myPool = mysql.createPool(params);
    const qPr = (sql:string, param:any[] = []) =>
        new Promise<any>((resolve,reject) => {
            myPool.query(sql,param,(error,rowsOrResult,fields) => {
                console.log("Received data")
                if(error) reject(error);
                else { 
                    const jsonFields = fields
                    ? fields.filter((f) => f.type === 245).map((f) => f.name)
                    : [];
                    const out = 
                        Array.isArray(rowsOrResult) && jsonFields
                            ? rowsOrResult.map((r:any) => {
                                const record = { ...r };
                                jsonFields.forEach((jf) => {
                                    const jsonStr = r[jf];
                                    record[jf] = jsonStr ? JSON.parse(jsonStr) : jsonStr;
                                });
                                return record;
                            })
                        : rowsOrResult
                    resolve(out)
                }
            });
        });
    const query = async (sql :string, param?: any[]) => {
        return qPr(sql,param)
    }
    const getRows = async (sql: string, param?: any[]) => {
        const result = await qPr(sql, param);
        return result.map(toCamelCase);
    }
    const stream = (sql :string, param? : any[]) => {
        return myPool.query(sql,param).stream();
    }
    return {
        query,
        getRows,
        stream
    }
}
