import { Component } from '@angular/core';
import { UserService } from '../../../backend/services/user/user.service';
import * as UIkit from 'uikit';

@Component({
  selector: 'sdm-form-sign-up',
  templateUrl: './sdm-form-sign-up.component.html',
  styleUrls: ['./sdm-form-sign-up.component.scss']
})
export class SdmFormSignUpComponent {

  name:string = "";
  email:string ="";
  password:string = "";
  confirmPassword:string = "";
  users:any;
  isLoading:boolean = false;

  constructor(private userService:UserService) {
    this.userService.getUsers().subscribe(
      data => { this.users = data},
      error => console.log(error)
    );
  }

  createUser(){
    this.isLoading = true;
    if(this.name.length == 0 || this.email.length == 0 || this.password.length == 0 || this.confirmPassword.length == 0){
      this.isLoading = false;
      UIkit.notification({
        message: "<span uk-icon='icon: warning'></span> Existem campos em branco!",
        status: "warning",
        timeout: 3000
      })
    }
    else {
      if(this.password.length > 0 && this.confirmPassword === this.password){
        if(this.password.length < 6){
          this.isLoading = false;
          UIkit.notification({
            message: "<span uk-icon='icon: ban'></span> Sua senha deve conter no mínimo 6 caracteres!",
            status: "danger",
            timeout: 1500
          })
        }
        else{
          this.userService.createUser(this.name, this.email, this.password);
          this.name = "";
          this.email = "";
          this.password = "";
          this.confirmPassword = "";
          setTimeout(this.isLoading = true, 300)
        }
      }
      else if(this.confirmPassword !== this.password){
        this.isLoading = false;
        UIkit.notification({
          message: "<span uk-icon='icon: close'></span> As senhas não correspondem!", 
          status: "danger", 
          timeout: 1500})
      }
    }
  }

  loginFacebook(){
    this.userService.loginFacebook();
  }

  loginGoogle(){
    this.userService.loginGoogle();
  }
}
