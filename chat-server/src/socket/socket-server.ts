import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIO from 'socket.io';
import { Message } from '../models/message.model';
import { ChatController } from './controllers/chat-controller';

export class SocketServer {
    
    static readonly PORT:number = 3000;
    socketApp: express.Application;
    server: Server;
    io: socketIO.Server;
    port: number | string;

    constructor() {
        this.socketApp = express();
        this.initConfig();
    }

    initConfig() {
        this.server = createServer(this.socketApp);
        this.port = process.env.PORT || SocketServer.PORT;
        this.io = socketIO(this.server);
        this.server.listen(this.port, () => {
            console.log('Socket Server is running at port #' + this.port);
        });
        new ChatController(this.io);
    }

}