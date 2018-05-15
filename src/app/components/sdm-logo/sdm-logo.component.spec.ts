import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdmLogoComponent } from './sdm-logo.component';

describe('SdmLogoComponent', () => {
  let component: SdmLogoComponent;
  let fixture: ComponentFixture<SdmLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdmLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdmLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
