import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdmHeaderComponent } from './sdm-header.component';

describe('SdmHeaderComponent', () => {
  let component: SdmHeaderComponent;
  let fixture: ComponentFixture<SdmHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdmHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdmHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
