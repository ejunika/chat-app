import { Injectable } from '@angular/core';
import * as socketIO from 'socket.io';
import * as client from 'socket.io-client';
import * as ServerConfig from '../config/server.config.json'; 

@Injectable()
export class ConnectionService {

  io: socketIO.Socket;
  serverUrl: string;
  serverConfig: any;

  constructor() {
    this.serverConfig = ServerConfig;
    this.serverUrl = this.buildServerUrl();
    this.initConnection();
  }

  buildServerUrl() {
    let baseUrl;
    if (this.serverConfig) {
      if (this.serverConfig.sslEnabled) {
        baseUrl = 'https://'
      } else {
        baseUrl = 'http://'
      }
      if (this.serverConfig.domain) {
        baseUrl += this.serverConfig.domain;
        if (this.serverConfig.port) {
          baseUrl += ':' + this.serverConfig.port;
        }
      }
      if (this.serverConfig.appContext) {
        baseUrl += this.serverConfig.appContext
      }
    }
    return baseUrl;
  }

  getServerUrl() {
    return this.serverUrl;
  }

  initConnection() {
    this.io = client.connect(this.serverUrl);
  }

}

export enum Events {
  ONLINE_USER = 'online',
  SUBSCRIBE = 'subscribe',
  SUBSCRIBE_ERROR = 'sub_err',
  ACKNOWLEDGE = 'acknowledge',
  MESSAGE = 'message',
  CONNECT = 'connect',
  DISCONNECT = 'disconnect'
}

export class Message {
  from: User;
  to: Array<User>;
  constructor(from: User, to: User | Array<User>) {
    this.from = from;
    if (to instanceof Array) {
      this.to = to;
    } else {
      this.to = [to];
    }
  }
}

export class Acknowledgement extends Message {
  type: ACKNOWLEDGE_TYPE;
  status: boolean;
  constructor(from: User, to: User | Array<User>, status: boolean, type: ACKNOWLEDGE_TYPE) {
    super(from, to);
    this.type = type;
    this.status = status;
  }
}

export enum ACKNOWLEDGE_TYPE {
  TYPING = 'typing'
}

export enum ACTIVITY_STATUS {
  ONLINE = 'online',
  OFFLINE = 'offline',
  AWAY = 'away'
}

export class User {
  userName: string;
  activityStatus: ACTIVITY_STATUS;
  constructor(userName: string) {
    this.userName = userName;
  }
}

export class ChatMessage extends Message {
  from: User;
  to: Array<User>;
  body: string;
  self: boolean;
  constructor(from: User, to: User | Array<User>, body: string) {
    super(from, to);
    this.body = body;
    this.self = false;
  }
}

export class ChatWindow {
  to: Array<User>;
  from: User;
  messageBox: Array<ChatMessage>;
  currentMessage: ChatMessage;
  visible: boolean;
  activityStatus: ACTIVITY_STATUS;
  constructor(from: User, to: User | Array<User>) {
    this.from = from;
    this.visible = true;
    if (to instanceof Array) {
      this.to = to;
    } else {
      this.to = [to];
    }
    this.currentMessage = new ChatMessage(this.from, this.to, '');
    this.messageBox = [];
  }
}

