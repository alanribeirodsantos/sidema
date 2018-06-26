import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdmMediaComponent } from './sdm-media.component';

describe('SdmMediaComponent', () => {
  let component: SdmMediaComponent;
  let fixture: ComponentFixture<SdmMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdmMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdmMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
