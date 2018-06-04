import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatesRouteComponent } from './plates-route.component';

describe('PlatesRouteComponent', () => {
  let component: PlatesRouteComponent;
  let fixture: ComponentFixture<PlatesRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatesRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatesRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
