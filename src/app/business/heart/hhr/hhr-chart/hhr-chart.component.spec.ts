import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HhrChartComponent } from './hhr-chart.component';

describe('HhrChartComponent', () => {
  let component: HhrChartComponent;
  let fixture: ComponentFixture<HhrChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HhrChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HhrChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
