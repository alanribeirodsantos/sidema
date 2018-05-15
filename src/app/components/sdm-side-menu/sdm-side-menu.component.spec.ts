import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdmSideMenuComponent } from './sdm-side-menu.component';

describe('SdmSideMenuComponent', () => {
  let component: SdmSideMenuComponent;
  let fixture: ComponentFixture<SdmSideMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdmSideMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdmSideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
