import { Component } from '@angular/core';

@Component({
  selector: 'sdm-form-card',
  templateUrl: './sdm-form-card.component.html',
  styleUrls: ['./sdm-form-card.component.scss']
})
export class SdmFormCardComponent {

  OnSignIn:boolean = false;

  toggleSignIn() {
    this.OnSignIn = !this.OnSignIn;
    console.log(this.OnSignIn);
  }

}
