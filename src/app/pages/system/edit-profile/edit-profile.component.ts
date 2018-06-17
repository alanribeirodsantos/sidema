import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../backend/services/user/user.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from 'angularfire2/storage';
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
  userRef:any;
  userPhoto:any;
  isLoading:boolean = false;
  
  constructor(private userService:UserService, private angularFireStorage:AngularFireStorage, private router:Router){}

  ngOnInit(){
    var user = JSON.parse(localStorage.getItem("user"));
    this.name = user.name;
    this.email = user.email;

    this.userRef = this.angularFireStorage.ref(`images/${user.id}`);
    this.userRef.getDownloadURL().subscribe(
      url => {
        this.userPhoto = url;
      },
      error => this.userPhoto = "/assets/images/user-default.png"
    )
  }

  changeProfilePic(event){
    this.profilePic = event.target.files[0];
    var reader = new FileReader();
    reader.addEventListener("loadend", () => {
      this.userPhoto = reader.result;
    }, false);
    reader.readAsDataURL(this.profilePic);
  }

  removePhoto(){
    var user = JSON.parse(localStorage.getItem("user"));
    this.userService.removeProfilePic(user.id);
  }

  editProfile(){
    this.isLoading = true;
    if(this.profilePic !== undefined){
      if(this.profilePic.size > 2097152){
        this.isLoading = false;
        UIkit.notification({
          message: "<span uk-icon='icon: ban'></span> A foto excede os 2MB permitidos!",
          status: "danger",
          timeout: 1500
        })
      }
    }
    if(this.newPassword.length > 0 && this.newPassword === this.confirmNewPassword){
      if(this.newPassword.length < 6){
        this.isLoading = false;
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
              this.isLoading = false;
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
        this.isLoading = false;
        UIkit.notification({
          message: "<span uk-icon='icon: ban'></span> É necessário digitar a senha atual!",
          status: "danger",
          timeout: 1500
        })
      }
    }
    else if(this.newPassword !== this.confirmNewPassword){
      this.isLoading = false;
      UIkit.notification({
        message: "<span uk-icon='icon: ban'></span> As senhas não correspondem!",
        status: "danger",
        timeout: 1500
      })
    }
    else {
      this.userService.updateUser(this.name, this.email, this.newPassword, this.profilePic);
    }
  }
}