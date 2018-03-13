import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcgdChartComponent } from './ecgd-chart.component';

describe('EcgdChartComponent', () => {
  let component: EcgdChartComponent;
  let fixture: ComponentFixture<EcgdChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcgdChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcgdChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
