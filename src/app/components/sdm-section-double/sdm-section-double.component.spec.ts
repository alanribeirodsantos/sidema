import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdmSectionDoubleComponent } from './sdm-section-double.component';

describe('SdmSectionDoubleComponent', () => {
  let component: SdmSectionDoubleComponent;
  let fixture: ComponentFixture<SdmSectionDoubleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdmSectionDoubleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdmSectionDoubleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
