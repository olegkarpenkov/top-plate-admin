import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TpAdminNavComponent } from './tp-admin-nav.component';

describe('TpAdminNavComponent', () => {
  let component: TpAdminNavComponent;
  let fixture: ComponentFixture<TpAdminNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TpAdminNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TpAdminNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
