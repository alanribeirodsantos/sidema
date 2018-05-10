import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdmAboutUsComponent } from './sdm-about-us.component';

describe('SdmAboutUsComponent', () => {
  let component: SdmAboutUsComponent;
  let fixture: ComponentFixture<SdmAboutUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdmAboutUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdmAboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
