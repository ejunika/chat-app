import { Component, OnInit, Input } from '@angular/core';
import { User } from '../connection.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {

  @Input()
  currentUser: User;

  userOptions: Array<any>

  constructor() { }

  ngOnInit() {
    this.userOptions = [];
  }

}
