import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdmReportCardComponent } from './sdm-report-card.component';

describe('SdmReportCardComponent', () => {
  let component: SdmReportCardComponent;
  let fixture: ComponentFixture<SdmReportCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdmReportCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdmReportCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
