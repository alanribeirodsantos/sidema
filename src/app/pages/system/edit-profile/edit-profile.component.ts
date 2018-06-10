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
  profilePic:any;
  flag:number = 0;
  
  constructor(private userService:UserService, private router:Router){}

  ngOnInit(){
    var user = JSON.parse(localStorage.getItem("user"));
    this.name = user.name;
    this.email = user.email;
  }

  changeProfilePic(event){  
    document.getElementsByClassName("form-editProfile__form__filePicker")[0].addEventListener("click", () => {
      event.target.value = null;
    })
    this.profilePic = event.target.files[0];
    var reader = new FileReader();
    reader.addEventListener("loadend", () => {
      var photo = document.getElementById("photo");
      photo.style.background = `url(${reader.result}) no-repeat`;
      photo.style.backgroundSize = "cover";
    }, false);
    reader.readAsDataURL(this.profilePic);
  }

  editProfile(){
    if(this.profilePic !== undefined){
      if(this.profilePic.size > 2097152){
        UIkit.notification({
          message: "<span uk-icon='icon: ban'></span> A foto excede os 2MB permitidos!",
          status: "danger",
          timeout: 1500
        })
      }
    }
    if(this.newPassword.length > 0 && this.newPassword === this.confirmNewPassword){
      if(this.newPassword.length < 6){
        UIkit.notification({
          message: "<span uk-icon='icon: ban'></span> Sua senha deve conter no mínimo 6 caracteres!",
          status: "danger",
          timeout: 1500
        })
      }
      else if(this.currentPassword.length > 0){
        var users:any;
        this.userService.getUsers().subscribe(
          data => {
            users = data;
            for(let u in users){
              if(this.currentPassword === users[u].password){
                this.userService.updateUser(this.name, this.email, this.newPassword, this.profilePic);
                this.flag = 1;
                break;
              }
            }
            if(this.flag === 0){
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
      else {
        UIkit.notification({
          message: "<span uk-icon='icon: ban'></span> É necessário digitar a senha atual!",
          status: "danger",
          timeout: 1500
        })
      }
    }
    else if(this.newPassword !== this.confirmNewPassword){
      UIkit.notification({
        message: "<span uk-icon='icon: ban'></span> As senhas não correspondem!",
        status: "danger",
        timeout: 1500
      })
    }
    else this.userService.updateUser(this.name, this.email, this.newPassword, this.profilePic);
  }
}