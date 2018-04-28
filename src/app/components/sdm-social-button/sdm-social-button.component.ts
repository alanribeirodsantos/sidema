import { Component, Input } from '@angular/core';

@Component({
  selector: 'sdm-social-button',
  templateUrl: './sdm-social-button.component.html',
  styleUrls: ['./sdm-social-button.component.scss']
})
export class SdmSocialButtonComponent {

  @Input() socialNetwork:string;
  @Input() btnWidth:string;
  @Input() btnFloat:string;

}
