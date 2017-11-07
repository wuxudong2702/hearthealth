import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminZtreeComponent } from './admin-ztree.component';

describe('AdminZtreeComponent', () => {
  let component: AdminZtreeComponent;
  let fixture: ComponentFixture<AdminZtreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminZtreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminZtreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
