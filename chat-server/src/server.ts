import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import errorHandler = require('errorhandler');
import methodOverride = require('method-override');

import { IndexRoute } from './routes'
import { SocketServer } from './socket/socket-server';

export class Server {
    
    app: express.Application;

    public static bootstrap(): Server {
        return new Server();
    }

    constructor() {
        this.app = express();
        this.initConfig();
        this.initRoutes();
        this.initAPIs();
        new SocketServer();
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
        this.app.use((err: any, 
            req: express.Request, 
            res: express.Response, 
            next: express.NextFunction) => {
            err.status = 404;
            next(err);
        });
        this.app.use(errorHandler());
    }

    initRoutes() {
        let router: express.Router = express.Router();
        IndexRoute.create(router);
        this.app.use(router);
    }

    initAPIs() {}

}