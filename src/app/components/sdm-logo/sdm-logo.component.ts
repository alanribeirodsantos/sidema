import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sdm-logo',
  templateUrl: './sdm-logo.component.html',
  styleUrls: ['./sdm-logo.component.scss']
})
export class SdmLogoComponent implements OnInit {

  @Input() typeImg:string;
  logoNormal = 'assets/images/logo.png'
  logoBranca = 'assets/images/secao3/logoBranca.png'

  constructor() { }

  ngOnInit() {
  }

}
