"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const express = require("express");
const socketIO = require("socket.io");
const chat_controller_1 = require("./controllers/chat-controller");
class SocketServer {
    constructor() {
        this.socketApp = express();
        this.initConfig();
    }
    initConfig() {
        this.server = http_1.createServer(this.socketApp);
        this.port = process.env.PORT || SocketServer.PORT;
        this.io = socketIO(this.server);
        this.server.listen(this.port, () => {
            console.log('Socket Server is running at port #' + this.port);
        });
        new chat_controller_1.ChatController(this.io);
    }
}
SocketServer.PORT = 3000;
exports.SocketServer = SocketServer;
