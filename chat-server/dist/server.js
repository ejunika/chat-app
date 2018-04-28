"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");
const errorHandler = require("errorhandler");
const methodOverride = require("method-override");
const mysql_1 = require("mysql");
const routes_1 = require("./routes");
const socket_server_1 = require("./socket/socket-server");
class Server {
    static bootstrap() {
        return new Server();
    }
    constructor() {
        this.app = express();
        this.initConfig();
        this.initRoutes();
        //this.initConnectionPool();
        new socket_server_1.SocketServer();
    }
    initConfig() {
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.use(cookieParser('SECRET_GOES_HERE'));
        this.app.use(methodOverride());
        this.app.use((err, req, res, next) => {
            err.status = 404;
            next(err);
        });
        this.app.use(errorHandler());
    }
    initRoutes() {
        let router = express.Router();
        routes_1.IndexRoute.create(router);
        this.app.use(router);
    }
    initConnectionPool() {
        let pool = mysql_1.createPool({
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: 'Admin',
            database: 'ezportal',
            connectionLimit: 5
        });
        pool.getConnection((err, connection) => {
            if (err)
                throw err;
            connection.query('SELECT * FROM users', (err, result, fields) => {
                if (err) {
                    connection.release();
                    throw err;
                }
                console.log(result);
                connection.release();
            });
        });
    }
}
exports.Server = Server;
