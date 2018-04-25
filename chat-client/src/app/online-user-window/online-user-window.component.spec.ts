import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineUserWindowComponent } from './online-user-window.component';

describe('OnlineUserWindowComponent', () => {
  let component: OnlineUserWindowComponent;
  let fixture: ComponentFixture<OnlineUserWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineUserWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineUserWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
