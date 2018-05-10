import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdmDownArrowComponent } from './sdm-down-arrow.component';

describe('SdmDownArrowComponent', () => {
  let component: SdmDownArrowComponent;
  let fixture: ComponentFixture<SdmDownArrowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdmDownArrowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdmDownArrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
