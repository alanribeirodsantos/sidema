import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdmBackToTopComponent } from './sdm-back-to-top.component';

describe('SdmBackToTopComponent', () => {
  let component: SdmBackToTopComponent;
  let fixture: ComponentFixture<SdmBackToTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdmBackToTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdmBackToTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
