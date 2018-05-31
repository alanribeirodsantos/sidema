import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sdm-logo',
  templateUrl: './sdm-logo.component.html',
  styleUrls: ['./sdm-logo.component.scss']
})
export class SdmLogoComponent implements OnInit {

  @Input() type:string = '';

  constructor() { }

  ngOnInit() {
  }

}
