import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdmCardCategoriaComponent } from './sdm-card-categoria.component';

describe('SdmCardCategoriaComponent', () => {
  let component: SdmCardCategoriaComponent;
  let fixture: ComponentFixture<SdmCardCategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdmCardCategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdmCardCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
