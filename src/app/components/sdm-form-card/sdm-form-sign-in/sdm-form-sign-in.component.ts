import { Component, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../backend/services/user.service';
// import { EventEmitter } from 'protractor';

@Component({
  selector: 'sdm-form-sign-in',
  templateUrl: './sdm-form-sign-in.component.html',
  styleUrls: ['./sdm-form-sign-in.component.scss']
})
export class SdmFormSignInComponent {

  email:string = "";
  password:string = "";
  @Output() clickedForgot:EventEmitter<any> = new EventEmitter();

  constructor(private userService:UserService) {}

  login(){
    this.userService.login(this.email, this.password);
  }

  loginFacebook(){
    this.userService.loginFacebook();
  }

  loginGoogle(){
    this.userService.loginGoogle();
  }

  forgotPassword(){
    this.clickedForgot.emit("forgot");
  }
}
