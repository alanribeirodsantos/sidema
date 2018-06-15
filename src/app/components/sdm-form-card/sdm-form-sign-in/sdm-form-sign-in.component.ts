import { Component, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../backend/services/user/user.service';

@Component({
  selector: 'sdm-form-sign-in',
  templateUrl: './sdm-form-sign-in.component.html',
  styleUrls: ['./sdm-form-sign-in.component.scss']
})
export class SdmFormSignInComponent {

  email:string = "";
  password:string = "";
  isLoading: boolean = false;
  @Output() clickedForgot:EventEmitter<any> = new EventEmitter();

  constructor(private userService:UserService) {}

  login(){
    this.isLoading = true;
    this.userService.login(this.email, this.password);
    setTimeout(this.isLoading = false, 300)
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
