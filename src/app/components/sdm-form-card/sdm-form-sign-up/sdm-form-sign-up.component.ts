import { Component } from '@angular/core';
import { UserService } from '../../../backend/services/user.service';

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

  constructor(private userService:UserService) {
    this.userService.getUsers().subscribe(
      data => { this.users = data},
      error => console.log(error)
    );
  }

  createUser(){
    if(this.name.length == 0 || this.email.length == 0 || this.password.length == 0 || this.confirmPassword.length == 0){
      alert("Existem campos em branco!");
    }
    else {
      if(this.confirmPassword === this.password){
        this.userService.createUser(this.name, this.email, this.password);
        this.name = "";
        this.email = "";
        this.password = "";
        this.confirmPassword = "";
      }
      else alert("As senhas não correspondem!");
    }
  }
}
