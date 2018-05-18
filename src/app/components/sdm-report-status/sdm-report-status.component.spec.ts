import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdmReportStatusComponent } from './sdm-report-status.component';

describe('SdmReportStatusComponent', () => {
  let component: SdmReportStatusComponent;
  let fixture: ComponentFixture<SdmReportStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdmReportStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdmReportStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
