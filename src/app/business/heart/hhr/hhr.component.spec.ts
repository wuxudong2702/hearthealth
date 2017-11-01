import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HhrComponent } from './hhr.component';

describe('HhrComponent', () => {
  let component: HhrComponent;
  let fixture: ComponentFixture<HhrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HhrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HhrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
