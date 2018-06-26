import { Component, Input } from '@angular/core';

@Component({
  selector: 'sdm-logo',
  templateUrl: './sdm-logo.component.html',
  styleUrls: ['./sdm-logo.component.scss']
})
export class SdmLogoComponent{

  @Input() type:string = '';
  @Input() size:string;

  constructor() { }

}
