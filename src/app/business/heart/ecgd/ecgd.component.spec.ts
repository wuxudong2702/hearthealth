import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcgdComponent } from './ecgd.component';

describe('EcgdComponent', () => {
  let component: EcgdComponent;
  let fixture: ComponentFixture<EcgdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcgdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcgdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
