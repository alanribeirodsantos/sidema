import { Component, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'sdm-form-card',
  templateUrl: './sdm-form-card.component.html',
  styleUrls: ['./sdm-form-card.component.scss']
})
export class SdmFormCardComponent {

  OnSignIn:boolean = false;
  OnSignUp:boolean = true;
  OnForgotPassword:boolean = false;

  @Output() closeModal:EventEmitter<any> = new EventEmitter();

  exitThisModal() {
    this.closeModal.emit("");
  }

  toggleState(state){
    if(state === "signIn"){
      this.OnSignUp = false;
      this.OnSignIn = true;
      this.OnForgotPassword = false;
    }
    else if(state === "forgot"){
      this.OnSignUp = false;
      this.OnSignIn = false;
      this.OnForgotPassword = true;
    }
    else if(state === "signUp"){
      this.OnSignUp = true;
      this.OnSignIn = false;
      this.OnForgotPassword = false;
    }
  }
}
