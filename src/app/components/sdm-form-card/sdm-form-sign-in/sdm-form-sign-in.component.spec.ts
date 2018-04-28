import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdmFormSignInComponent } from './sdm-form-sign-in.component';

describe('SdmFormSignInComponent', () => {
  let component: SdmFormSignInComponent;
  let fixture: ComponentFixture<SdmFormSignInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdmFormSignInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdmFormSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
