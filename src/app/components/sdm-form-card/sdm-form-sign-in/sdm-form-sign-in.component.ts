import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../backend/services/user.service';

@Component({
  selector: 'sdm-form-sign-in',
  templateUrl: './sdm-form-sign-in.component.html',
  styleUrls: ['./sdm-form-sign-in.component.scss']
})
export class SdmFormSignInComponent implements OnInit {

  email:string = "";
  password:string = "";

  constructor(private userService:UserService) {}

  ngOnInit() {}

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
