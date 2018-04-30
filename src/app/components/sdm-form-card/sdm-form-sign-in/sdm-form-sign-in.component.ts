import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../backend/services/user.service';

@Component({
  selector: 'sdm-form-sign-in',
  templateUrl: './sdm-form-sign-in.component.html',
  styleUrls: ['./sdm-form-sign-in.component.scss']
})
export class SdmFormSignInComponent implements OnInit {

  email:string = "";
  senha:string = "";

  constructor(private userService:UserService) {}

  ngOnInit() {}

  logar(){
    this.userService.logarUsuario(this.email, this.senha);
  }

}
