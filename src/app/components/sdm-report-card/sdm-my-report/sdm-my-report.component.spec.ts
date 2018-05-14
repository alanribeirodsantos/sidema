import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdmMyReportComponent } from './sdm-my-report.component';

describe('SdmMyReportComponent', () => {
  let component: SdmMyReportComponent;
  let fixture: ComponentFixture<SdmMyReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdmMyReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdmMyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
