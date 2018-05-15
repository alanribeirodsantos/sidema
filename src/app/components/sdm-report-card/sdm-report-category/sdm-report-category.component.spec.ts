import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdmReportCategoryComponent } from './sdm-report-category.component';

describe('SdmReportCategoryComponent', () => {
  let component: SdmReportCategoryComponent;
  let fixture: ComponentFixture<SdmReportCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdmReportCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdmReportCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
