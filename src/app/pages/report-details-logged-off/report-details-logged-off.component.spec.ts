import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDetailsLoggedOffComponent } from './report-details-logged-off.component';

describe('ReportDetailsLoggedOffComponent', () => {
  let component: ReportDetailsLoggedOffComponent;
  let fixture: ComponentFixture<ReportDetailsLoggedOffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportDetailsLoggedOffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDetailsLoggedOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
