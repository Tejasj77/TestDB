// import fs from 'fs';
// import util from 'util'
// import urlm from 'url'
// import mysql from 'mysql'
// import stream from 'stream'

// interface QueryResponse {
//     fieldCount?:number;
//     affectedRows?:number;
//     insertID?:number;
//     changedRpws?:number;
// }

// const readFile = util.promisify(fs.readFile)

// async function createDatabase(connStr:string){
//     const url = urlm.parse(connStr);
//     const dbName = (url.pathname || '').substr(1);
//     url.pathname = '/';
//     const conn = mysql.createConnection(urlm.format(url));
//     const connectPr = util.promisify(conn.connect).bind(conn);
//     const queryPr = util.promisify(conn.query).bind(conn);
//     const endPr = util.promisify(conn.end).bind(conn);
//     await connectPr();
//     await queryPr(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
//     await endPr();
// }

// function toCamelCase(row:any){
//     const mod:any = {}
//     for(const key of Object.keys(row)){
//         const camelKey = key.replace(/_([a-z])/g,(chars)=>chars[1].toUpperCase());
//         mod[camelKey] = row[key]
//     }
//     return mod;
// }

// export interface IDbUtils {
//     query(sql: string, params?: any[]): Promise<QueryResponse>;
//     getRows(sql: string, params?: any[]): Promise<any[]>;
//     stream(sql: string, params?: any[]): stream.Readable;
// }

// const cleanSQL = (sql:string) => sql.replace(/[\s\n]+/g,' ').trim();

// export async function initMysqlConn(
//     connStr:string,
//     schemaFile?:string
// ):Promise<IDbUtils> {
//     await createDatabase(connStr);
//     if(schemaFile){
//         const schemaSQL = await readFile(schemaFile,'utf-8');
//         const conn = mysql.createConnection(`${connStr}?multipleStatements=true`);
//         const connectPr = util.promisify(conn.connect).bind(conn);
//         const queryPr = util.promisify(conn.query).bind(conn);
//         const endPr = util.promisify(conn.end).bind(conn)
//         await connectPr();
//         await queryPr(schemaSQL);
//         await endPr();
//     }

//     const myPool = mysql.createPool(connStr);
//     const queryPr = (sql:string,params:any[]=[])=>
//         new Promise<any>((resolve,reject)=>{
//             myPool.query(sql, params, (error, rowsOrResult, fields) => {
//                 if (error) reject(error);
//                 else {
//                   // type is 245 for JSON field type
//                   const jsonFields = fields
//                     ? fields.filter((f) => f.type === 245).map((f) => f.name)
//                     : [];
//                   const out =
//                     Array.isArray(rowsOrResult) && jsonFields
//                       ? rowsOrResult.map((r: any) => {
//                           const record = { ...r };
//                           jsonFields.forEach((jf) => {
//                             const jsonStr = r[jf];
//                             record[jf] = jsonStr ? JSON.parse(jsonStr) : jsonStr;
//                           });
//                           return record;
//                         })
//                       : rowsOrResult;
//                   resolve(out);
//                 }
//               });
//             });
//           const query = async (sql: string, params?: any[]) => {
//             console.log(cleanSQL(sql))
//             return queryPr(sql, params);
//           };
//           const getRows = async (sql: string, params?: any[]) => {
//             const result = await queryPr(sql, params);
//             return result.map(toCamelCase);
//           };
//           const stream = (sql: string, params?: any[]) => {
//             console.log(cleanSQL(sql))
//             return myPool.query(sql, params).stream();
//           };
//           return {
//               query,
//               getRows,
//               stream
//           };
//     }
