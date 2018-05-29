import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../backend/services/user/user.service';
import { Router } from '@angular/router';
import * as UIkit from 'uikit';

@Component({
  selector: 'edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  edit: boolean = false;
  name:string;
  email:string;
  newPassword:string = "";
  confirmNewPassword:string = "";
  currentPassword:string = "";
  
  constructor(private userService:UserService, private router:Router){}

  ngOnInit(){
    var user = JSON.parse(localStorage.getItem("user"));
    this.name = user.name;
    this.email = user.email;
  }

  changeProfilePic(event){    
    this.userService.uploadProfilePic(event.target.files[0]);
  }

  editProfile(){
    this.edit = true;
    var flag:number = 0;
    if(this.newPassword.length >= 6 && this.newPassword === this.confirmNewPassword){
      if(this.currentPassword.length > 0){
        var users:any;
        this.userService.getUsers().subscribe(
          data => {
            users = data;
            for(let u in users){
              if(this.currentPassword === users[u].password){
                this.userService.updateUser(this.name, this.email, this.newPassword);
                flag = 1;
                break;
              }
            }
            if(flag === 0){
              UIkit.notification({
                message: "<span uk-icon='icon: ban'></span> Senha atual incorreta!",
                status: "danger",
                timeout: 1500
              })
            }
          },
          error => console.log(error)
        )
      }
    }
    else this.userService.updateUser(this.name, this.email, this.newPassword);
  }
}