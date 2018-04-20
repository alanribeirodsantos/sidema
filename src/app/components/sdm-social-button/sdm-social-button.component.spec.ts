import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdmSocialButtonComponent } from './sdm-social-button.component';

describe('SdmSocialButtonComponent', () => {
  let component: SdmSocialButtonComponent;
  let fixture: ComponentFixture<SdmSocialButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdmSocialButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdmSocialButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
