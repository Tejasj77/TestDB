import dotenv from 'dotenv'

dotenv.config()

let MYSQL_DB_PORT = parseInt(process.env.MYSQL_DB_PORT!) || 3306
let MYSQL_DB_DATABASE = process.env.MYSQL_DB_DATABASE || 'mydb'
let MYSQL_DB_HOSTNAME = process.env.MYSQL_DB_HOSTNAME  || 'root'
let MYSQL_DB_PASSWORD = process.env.MYSQL_DB_PASSWORD || 'tejasjoshi'


let MYSQL = {
    host:MYSQL_DB_HOSTNAME,
    db:MYSQL_DB_DATABASE,
    port:MYSQL_DB_PORT,
    password:MYSQL_DB_PASSWORD
}
let SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
let SERVER_PORT = process.env.SERVER_PORT || 8000;

let SERVER = {
    host:SERVER_HOSTNAME,
    port:SERVER_PORT
}

let config = {
    mysql:MYSQL,
    server:SERVER
}

export default config;