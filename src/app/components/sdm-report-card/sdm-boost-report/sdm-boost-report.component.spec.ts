import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdmBoostReportComponent } from './sdm-boost-report.component';

describe('SdmBoostReportComponent', () => {
  let component: SdmBoostReportComponent;
  let fixture: ComponentFixture<SdmBoostReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdmBoostReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdmBoostReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
