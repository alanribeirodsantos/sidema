import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdmCardCategoryComponent } from './sdm-card-category.component';

describe('SdmCardCategoryComponent', () => {
  let component: SdmCardCategoryComponent;
  let fixture: ComponentFixture<SdmCardCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdmCardCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdmCardCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
