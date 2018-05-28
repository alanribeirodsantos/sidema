import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdmLogoBrancaComponent } from './sdm-logo-branca.component';

describe('SdmLogoBrancaComponent', () => {
  let component: SdmLogoBrancaComponent;
  let fixture: ComponentFixture<SdmLogoBrancaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdmLogoBrancaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdmLogoBrancaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
