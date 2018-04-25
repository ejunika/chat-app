import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ChatWindow, ChatMessage, ACTIVITY_STATUS } from '../connection.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit {

  @Input()
  chatWindow: ChatWindow;

  @Output()
  onSendMessage: EventEmitter<ChatMessage> = new EventEmitter();

  toUserNames: string = '';

  messageBody: '';

  constructor() { }

  ngOnInit() {
    for (let i = 0; i < this.chatWindow.to.length; i++) {
      this.toUserNames += this.chatWindow.to[i].userName;
    }
  }

  sendMessage(body: string) {
    this.chatWindow.currentMessage = new ChatMessage(this.chatWindow.from, this.chatWindow.to, body);
    this.onSendMessage.emit(this.chatWindow.currentMessage);
    this.chatWindow.currentMessage.self = true;
    this.chatWindow.messageBox.push(this.chatWindow.currentMessage);
    this.messageBody = '';
  }

  close() {
    this.chatWindow.visible = false;
  }

}
