import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdmFormCardComponent } from './sdm-form-card.component';

describe('SdmFormCardComponent', () => {
  let component: SdmFormCardComponent;
  let fixture: ComponentFixture<SdmFormCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdmFormCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdmFormCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
