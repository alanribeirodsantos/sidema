import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdmCloseButtonComponent } from './sdm-close-button.component';

describe('SdmCloseButtonComponent', () => {
  let component: SdmCloseButtonComponent;
  let fixture: ComponentFixture<SdmCloseButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdmCloseButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdmCloseButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
