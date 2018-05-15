import { Component } from '@angular/core';
import { UserService } from '../../../backend/services/user.service';

@Component({
  selector: 'sdm-form-forgot-password',
  templateUrl: './sdm-form-forgot-password.component.html',
  styleUrls: ['./sdm-form-forgot-password.component.scss']
})
export class SdmFormForgotPasswordComponent {

  email:string = "";

  constructor(private userService:UserService) { }

  resetPassword(){
    this.userService.resetPassword(this.email);
  }
}
