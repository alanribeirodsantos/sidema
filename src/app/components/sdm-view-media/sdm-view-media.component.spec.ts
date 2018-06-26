import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdmViewMediaComponent } from './sdm-view-media.component';

describe('SdmViewMediaComponent', () => {
  let component: SdmViewMediaComponent;
  let fixture: ComponentFixture<SdmViewMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdmViewMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdmViewMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
