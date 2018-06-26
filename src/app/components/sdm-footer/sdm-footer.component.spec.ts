import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdmFooterComponent } from './sdm-footer.component';

describe('SdmFooterComponent', () => {
  let component: SdmFooterComponent;
  let fixture: ComponentFixture<SdmFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdmFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdmFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
