import { Component, Input } from '@angular/core';

@Component({
  selector: 'sdm-faq-question',
  templateUrl: './sdm-faq-question.component.html',
  styleUrls: ['./sdm-faq-question.component.scss'],
  host: {'class': 'uk-width-1-2@m'}
})
export class SdmFaqQuestionComponent {

  @Input() question:string;
  @Input() answer:string;

}
