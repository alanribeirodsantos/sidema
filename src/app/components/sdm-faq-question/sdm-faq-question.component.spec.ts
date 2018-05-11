import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdmFaqQuestionComponent } from './sdm-faq-question.component';

describe('SdmFaqQuestionComponent', () => {
  let component: SdmFaqQuestionComponent;
  let fixture: ComponentFixture<SdmFaqQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdmFaqQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdmFaqQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
