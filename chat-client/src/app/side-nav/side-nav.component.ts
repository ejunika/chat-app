import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../connection.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  @Input()
  onlineUsers: User;

  @Output()
  onSelectUser: EventEmitter<User> = new EventEmitter();

  @Input()
  rumCount: number;

  constructor() { }

  ngOnInit() {
    
  }

  selectUser(onlineUser: User) {
    this.onSelectUser.emit(onlineUser);
  }

  updateRecievedUnreadMessageCount(rumCount: number) {
    this.rumCount = rumCount;
  }

}
