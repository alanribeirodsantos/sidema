import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdmSectionComponent } from './sdm-section.component';

describe('SdmSectionComponent', () => {
  let component: SdmSectionComponent;
  let fixture: ComponentFixture<SdmSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdmSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdmSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
