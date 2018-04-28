import { Component, Input } from '@angular/core';

@Component({
  selector: 'sdm-button',
  templateUrl: './sdm-button.component.html',
  styleUrls: ['./sdm-button.component.scss']
})
export class SdmButtonComponent {

  @Input() type:string;
  @Input() btnWidth:string;

}
