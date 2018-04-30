import { Component, OnInit } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
import { UserService } from '../../../backend/services/user.service';

@Component({
  selector: 'sdm-form-sign-up',
  templateUrl: './sdm-form-sign-up.component.html',
  styleUrls: ['./sdm-form-sign-up.component.scss']
})
export class SdmFormSignUpComponent implements OnInit {

  nome:string = "";
  email:string ="";
  senha:string = "";
  confirmarSenha:string = "";
  usuarios:any;

  constructor(private userService:UserService) {
    this.userService.getUsers().subscribe(
      data => { this.usuarios = data},
      error => console.log(error)
    );
  }

  ngOnInit() {
    
  }

  createUser(){
    if(this.confirmarSenha === this.senha){
      this.userService.createUser(this.nome, this.email, this.senha);
      this.nome = "";
      this.email = "";
      this.senha = "";
      this.confirmarSenha = "";
    }
    else alert("As senhas não correspondem!");
  }
}
