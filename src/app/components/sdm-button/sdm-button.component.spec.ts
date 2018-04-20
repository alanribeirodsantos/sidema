import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdmButtonComponent } from './sdm-button.component';

describe('SdmButtonComponent', () => {
  let component: SdmButtonComponent;
  let fixture: ComponentFixture<SdmButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdmButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdmButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
