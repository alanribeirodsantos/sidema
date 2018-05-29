import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultReportsComponent } from './consult-reports.component';

describe('ConsultReportsComponent', () => {
  let component: ConsultReportsComponent;
  let fixture: ComponentFixture<ConsultReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
