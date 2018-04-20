import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sdm-social-button',
  templateUrl: './sdm-social-button.component.html',
  styleUrls: ['./sdm-social-button.component.scss']
})
export class SdmSocialButtonComponent implements OnInit {

  @Input() socialNetwork:string;
  @Input() type:string;

  buttonTitle:string;

  ngOnInit() {
    if (this.type == "sign-in") {
      this.buttonTitle = 'Entar com o ' + this.socialNetwork;
    }
    else if (this.type == "sign-up"){
      this.buttonTitle = 'Continuar com o ' + this.socialNetwork;
    }
  }
}
