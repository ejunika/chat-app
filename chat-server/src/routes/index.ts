import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from './route';

export class IndexRoute extends BaseRoute {
    static create(router: Router) {
        console.log('[IndexRoute::create] Creating index route.');
        router.get('/', (req: Request, res: Response, next: NextFunction) => {
            //new IndexRoute().index(req, res, next);
            res.json({
                message: 'Hello World'
            });
        });
    }

    constructor() {
        super();
    }

    index(req: Request, res: Response, next: NextFunction) {
        this.title = 'Home | Tour of Heros';
        let options: Object = {
            message: 'Welcome to the Tour of Heros'
        }
        this.render(req, res, 'index', options);
    }
}