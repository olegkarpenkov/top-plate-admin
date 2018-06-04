import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersRouteComponent } from './users-route.component';

describe('UsersRouteComponent', () => {
  let component: UsersRouteComponent;
  let fixture: ComponentFixture<UsersRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
