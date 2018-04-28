import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdmFormSignUpComponent } from './sdm-form-sign-up.component';

describe('SdmFormSignUpComponent', () => {
  let component: SdmFormSignUpComponent;
  let fixture: ComponentFixture<SdmFormSignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdmFormSignUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdmFormSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
