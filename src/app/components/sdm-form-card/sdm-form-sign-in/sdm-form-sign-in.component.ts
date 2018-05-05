import { Component } from '@angular/core';
import { UserService } from '../../../backend/services/user.service';

@Component({
  selector: 'sdm-form-sign-in',
  templateUrl: './sdm-form-sign-in.component.html',
  styleUrls: ['./sdm-form-sign-in.component.scss']
})
export class SdmFormSignInComponent {

  email:string = "";
  password:string = "";

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

  resetPassword(){
    this.userService.resetPassword(this.email);
  }
}
