import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { UserService } from '../../backend/services/user/user.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'sdm-side-menu',
  templateUrl: './sdm-side-menu.component.html',
  styleUrls: ['./sdm-side-menu.component.scss']
})
export class SdmSideMenuComponent implements OnInit {

  @Output() closeMenu:EventEmitter<any> = new EventEmitter();

  exitThisMenu() {
    this.closeMenu.emit("");
  }
  
  userName:string = "";
  userId:any;
  userRef:any;
  userPhoto:any;

  constructor(private userService:UserService, private angularFireStorage:AngularFireStorage) {
  }

  ngOnInit(){
    var user = JSON.parse(localStorage.getItem("user"));
    if(user === null){
      this.userName = "";
    }
    else {
      this.userName = user.name;
      this.userId = JSON.parse(localStorage.getItem("user")).id;
    }

    this.userRef = this.angularFireStorage.ref(`images/${this.userId}`);
    this.userRef.getDownloadURL().subscribe(
      url => {
        this.userPhoto = url;
        this.userService.hasPhoto = true;
        this.userService.photoComment = url;
      },
      error => {
        if(this.userService.loggedFacebook){
          this.userPhoto = this.userService.userFacebookPhoto;
          this.userService.hasPhoto = true;
          this.userService.photoComment = this.userService.userFacebookPhoto;
        }
        else if(this.userService.loggedGoogle){
          this.userPhoto = this.userService.userGooglePhoto;
          this.userService.hasPhoto = true;
          this.userService.photoComment = this.userService.userGooglePhoto;
        }
        else {
          this.userPhoto = "/assets/images/user-default.png";
          this.userService.hasPhoto = false;
          this.userService.photoComment = "/assets/images/user-default.png"
        }
      }
    )
  }
  
  signOut(){
    this.userService.logout();
  }
}