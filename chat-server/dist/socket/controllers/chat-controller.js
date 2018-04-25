"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../../models/user.model");
class ChatController {
    constructor(io) {
        this.io = io;
        this.userSocket = new Map();
        this.socketUser = new Map();
        this.onlineUsers = [];
        this.listen();
    }
    updateUserSockets(userName, socket) {
        let sockets;
        if (!this.userSocket.has(userName)) {
            sockets = [];
            this.onlineUsers.push(new user_model_1.User(userName, user_model_1.ACTIVITY_STATUS.ONLINE));
        }
        else {
            sockets = this.userSocket.get(userName);
        }
        sockets.push(socket);
        this.userSocket.set(userName, sockets);
        this.socketUser.set(socket.id, userName);
        this.notifyAllUsers(Events.ONLINE_USER);
    }
    removeUserSocket(socketId) {
        let userName = this.socketUser.get(socketId);
        let sockets = this.userSocket.get(userName);
        sockets = sockets && sockets.filter((socket) => socket.id != socketId);
        if (sockets && sockets.length > 0) {
            this.userSocket.set(userName, sockets);
        }
        else {
            this.userSocket.delete(userName);
        }
        this.socketUser.delete(socketId);
        if (!this.userSocket.has(userName)) {
            this.onlineUsers = this.onlineUsers.filter((u) => u.userName != userName);
        }
        this.notifyAllUsers(Events.ONLINE_USER);
    }
    getUserSocket(userName) {
        return this.userSocket.get(userName);
    }
    sendAcknowledgement(ack) {
        let sockets;
        let to = ack.to;
        if (to) {
            for (let i = 0; i < to.length; i++) {
                sockets = this.getUserSocket(to[i].userName);
                for (let j = 0; j < sockets.length; j++) {
                    sockets[j].emit(Events.ACKNOWLEDGE, ack);
                }
            }
        }
        else {
            this.io.emit(Events.ACKNOWLEDGE, ack);
        }
    }
    dispatchMessage(m) {
        let sockets;
        let to = m.to;
        let from = m.from;
        if (to) {
            for (let i = 0; i < to.length; i++) {
                sockets = this.getUserSocket(to[i].userName);
                for (let j = 0; j < sockets.length; j++) {
                    sockets[j].emit(Events.MESSAGE, m);
                }
            }
        }
        else {
            this.io.emit(Events.MESSAGE, m);
        }
    }
    notifyAllUsers(event) {
        switch (event) {
            case Events.ONLINE_USER:
                console.log('[server](online): => ' + JSON.stringify(this.onlineUsers));
                this.io.emit(Events.ONLINE_USER, this.onlineUsers);
                break;
            default:
                break;
        }
    }
    listen() {
        this.io.on(Events.CONNECTION, (socket) => {
            console.log('[server](connect): => Client connected with id: ' + socket.id);
            socket.on(Events.SUBSCRIBE, (u) => {
                this.updateUserSockets(u.userName, socket);
                console.log('[server](subscribe): => ' + JSON.stringify(u));
            });
            socket.on(Events.MESSAGE, (m) => {
                console.log('[server](message): => ', JSON.stringify(m));
                this.dispatchMessage(m);
            });
            socket.on(Events.ACKNOWLEDGE, (m) => {
                console.log('[server](acknowledge): => ', JSON.stringify(m));
                this.sendAcknowledgement(m);
            });
            socket.on(Events.DISCONNECT, () => {
                console.log('[server](disconnect): => ' + JSON.stringify(new user_model_1.User(this.socketUser.get(socket.id), user_model_1.ACTIVITY_STATUS.OFFLINE)));
                this.removeUserSocket(socket.id);
            });
        });
    }
}
exports.ChatController = ChatController;
var Events;
(function (Events) {
    Events["ONLINE_USER"] = "online";
    Events["SUBSCRIBE"] = "subscribe";
    Events["SUBSCRIBE_ERROR"] = "sub_err";
    Events["ACKNOWLEDGE"] = "acknowledge";
    Events["MESSAGE"] = "message";
    Events["CONNECTION"] = "connection";
    Events["DISCONNECT"] = "disconnect";
})(Events = exports.Events || (exports.Events = {}));
