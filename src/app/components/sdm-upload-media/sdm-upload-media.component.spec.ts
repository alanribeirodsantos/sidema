import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdmUploadMediaComponent } from './sdm-upload-media.component';

describe('SdmMediaComponent', () => {
  let component: SdmUploadMediaComponent;
  let fixture: ComponentFixture<SdmUploadMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdmUploadMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdmUploadMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
