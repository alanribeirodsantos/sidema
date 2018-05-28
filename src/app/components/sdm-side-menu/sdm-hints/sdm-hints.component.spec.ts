import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdmHintsComponent } from './sdm-hints.component';

describe('SdmHintsComponent', () => {
  let component: SdmHintsComponent;
  let fixture: ComponentFixture<SdmHintsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdmHintsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdmHintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
