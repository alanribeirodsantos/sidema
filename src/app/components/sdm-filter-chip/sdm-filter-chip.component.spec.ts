import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdmFilterChipComponent } from './sdm-filter-chip.component';

describe('SdmFilterChipComponent', () => {
  let component: SdmFilterChipComponent;
  let fixture: ComponentFixture<SdmFilterChipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdmFilterChipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdmFilterChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
