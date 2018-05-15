import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdmFormForgotPasswordComponent } from './sdm-form-forgot-password.component';

describe('SdmFormForgotPasswordComponent', () => {
  let component: SdmFormForgotPasswordComponent;
  let fixture: ComponentFixture<SdmFormForgotPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdmFormForgotPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdmFormForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
