import { Component, OnInit } from '@angular/core';
import * as socketIO from 'socket.io';
import * as client from 'socket.io-client';
import { ToasterService } from 'angular5-toaster';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ConnectionService, ChatMessage, User, Events, ChatWindow } from '../connection.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  io: socketIO.Socket;
  currentUser: User;
  onlineUsers: Array<User>;
  chatWindows: Array<ChatWindow>;
  activeChatWindow: ChatWindow;
  rumCount: number = 0;

  constructor(private activatedRoute: ActivatedRoute, private connectionService: ConnectionService, private toasterService: ToasterService) {
    this.onlineUsers = [];
    this.chatWindows = [];
    this.io = this.connectionService.io;
  }

  onSelectUser(user: User) {
    this.openChatWindow(new ChatMessage(this.currentUser, [new User(user.userName)], ''));
  }

  openChatWindow(m: ChatMessage) {
    let currentChartWindow: ChatWindow;
    currentChartWindow = this.chatWindows.filter((chatWindow: ChatWindow) => chatWindow.to[0].userName == m.to[0].userName)[0];
    if (!currentChartWindow) {
      currentChartWindow = new ChatWindow(this.currentUser, m.to);
      this.chatWindows.push(currentChartWindow);
    }
    currentChartWindow.visible = true;
    if (m && m.body && m.from.userName == this.currentUser.userName) {
      currentChartWindow.messageBox.push(m);
    }
  }

  ngOnInit() {
    this.handleTraffic();
  }
  
  handleTraffic() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      let userName = params['un'];
      if (userName) {
        this.currentUser = new User(userName);
        this.toasterService.pop('success', 'Home', 'Hello ' + userName);
        this.io.on(Events.CONNECT, () => {
          console.log('[client](connect)');
          this.io.emit(Events.SUBSCRIBE, new User(userName));
          this.io.on(Events.ONLINE_USER, (onlineUsers: Array<User>) => {
            console.log('[client](online)' + JSON.stringify(onlineUsers));
            this.onlineUsers = onlineUsers.filter((u: User) => u.userName != userName);
          });
          this.io.on(Events.MESSAGE, (m: ChatMessage) => {
            console.log('[client](message): ' + JSON.stringify(m));
            m = this.exchangeToAndFrom(m);
            this.openChatWindow(m);
          });
        });
      }
    });
  }

  exchangeToAndFrom(m: ChatMessage): ChatMessage {
    let temp: User = m.to[0];
    m.to[0] = m.from;
    m.from = temp;
    return m;
  }

  onSendMessage(m: ChatMessage) {
    this.io.emit(Events.MESSAGE, m);
  }

}