import { Component } from '@angular/core';

@Component({
  selector: 'sdm-form-card',
  templateUrl: './sdm-form-card.component.html',
  styleUrls: ['./sdm-form-card.component.scss']
})
export class SdmFormCardComponent {

  OnSignIn:boolean = false;
  OnSignUp:boolean = true;
  OnForgotPassword:boolean = false;

  toggleState(state){
    if(state === "signIn"){
      this.OnSignUp = false;
      this.OnSignIn = true;
      this.OnForgotPassword = false;
    }
    else if(state === "forgot"){
      this.OnSignIn = false;
      this.OnForgotPassword = true;
      this.OnSignUp = false;
    }
    else if(state === "signUp"){
      this.OnSignUp = true;
      this.OnSignIn = false;
      this.OnForgotPassword = false;
    }
  }
}
