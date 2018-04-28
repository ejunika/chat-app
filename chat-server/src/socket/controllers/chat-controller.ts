import * as socketIO from 'socket.io';
import { Message } from '../../models/message.model';
import { User, ACTIVITY_STATUS } from '../../models/user.model';
import { ChatMessage, Acknowledgement } from '../../models/chart-message.model';

export class ChatController {

    userSocket: Map<string, Array<string>>;

    socketUser: Map<string, string>;

    onlineUsers: Array<User>;

    constructor(private io: socketIO.Server) {
        this.userSocket = new Map();
        this.socketUser = new Map();
        this.onlineUsers = [];
        this.listen();
    }

    updateUserSockets(userName: string, socket: socketIO.Socket) {
        let socketIds: Array<string>;
        if (!this.userSocket.has(userName)) {
            socketIds = [];
            this.onlineUsers.push(new User(userName, ACTIVITY_STATUS.ONLINE));
        } else {
            socketIds = this.userSocket.get(userName);
        }
        socketIds.push(socket.id);
        this.userSocket.set(userName, socketIds);
        this.socketUser.set(socket.id, userName);
        this.notifyAllUsers(Events.ONLINE_USER);
    }

    removeUserSocket(socketId: string) {
        let userName: string = this.socketUser.get(socketId);
        let socketIds: Array<string> = this.userSocket.get(userName);
        socketIds = socketIds && socketIds.filter((sId) => sId != socketId);
        if (socketIds && socketIds.length > 0) {
            this.userSocket.set(userName, socketIds);
        } else {
            this.userSocket.delete(userName);
        }
        this.socketUser.delete(socketId);
        if (!this.userSocket.has(userName)) {
            this.onlineUsers = this.onlineUsers.filter((u: User) => u.userName != userName);
        }
        this.notifyAllUsers(Events.ONLINE_USER);
    }

    getUserSocketIds(userName: string): Array<string> {
        return this.userSocket.get(userName);
    }

    sendAcknowledgement(ack: Acknowledgement) {
        let socketIds: Array<string>;
        let to: Array<User> = ack.to;
        if (to) {
            for (let i = 0; i < to.length; i++) {
                socketIds = this.getUserSocketIds(to[i].userName);
                for (let j = 0; j < socketIds.length; j++) {
                    this.io.to(socketIds[j]).emit(Events.ACKNOWLEDGE, ack);
                }
            }
        } else {
            this.io.emit(Events.ACKNOWLEDGE, ack);
        }
    }

    dispatchMessage(m: Message) {
        let socketIds: Array<string>;
        let to: Array<User> = m.to;
        let from: User = m.from;
        if (to) {
            for (let i = 0; i < to.length; i++) {
                socketIds = this.getUserSocketIds(to[i].userName);
                for (let j = 0; j < socketIds.length; j++) {
                    this.io.to(socketIds[j]).emit(Events.MESSAGE, m);
                }
            }
        } else {
            this.io.emit(Events.MESSAGE, m);
        }
    }

    notifyAllUsers(event: string) {
        switch(event) {
            case Events.ONLINE_USER:
                console.log('[server](online): => ' + JSON.stringify(this.onlineUsers));
                this.io.emit(Events.ONLINE_USER, this.onlineUsers);
                break;
            default:
                break;
        }
    }

    listen() {
        this.io.on(Events.CONNECTION, (socket: socketIO.Socket) => {
            console.log('[server](connect): => Client connected with id: ' + socket.id);
            socket.on(Events.SUBSCRIBE, (u: User) => {
                this.updateUserSockets(u.userName, socket);
                console.log('[server](subscribe): => ' + JSON.stringify(u));
            });
            socket.on(Events.MESSAGE, (m: ChatMessage) => {
                console.log('[server](message): => ', JSON.stringify(m));
                this.dispatchMessage(m);
            });
            socket.on(Events.ACKNOWLEDGE, (m: Acknowledgement) => {
                console.log('[server](acknowledge): => ', JSON.stringify(m));
                this.sendAcknowledgement(m);
            });
            socket.on(Events.DISCONNECT, () => {
                console.log('[server](disconnect): => ' + JSON.stringify(new User(this.socketUser.get(socket.id), ACTIVITY_STATUS.OFFLINE)));
                this.removeUserSocket(socket.id);
            });
        });
    }

}

export enum Events {
    ONLINE_USER = 'online',
    SUBSCRIBE = 'subscribe',
    SUBSCRIBE_ERROR = 'sub_err',
    ACKNOWLEDGE = 'acknowledge',
    MESSAGE = 'message',
    CONNECTION = 'connection',
    DISCONNECT = 'disconnect'
}