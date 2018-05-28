import { Component, OnInit} from '@angular/core';
import { UserService } from '../../backend/services/user/user.service';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'sdm-side-menu',
  templateUrl: './sdm-side-menu.component.html',
  styleUrls: ['./sdm-side-menu.component.scss']
})
export class SdmSideMenuComponent implements OnInit {
  
  userName:string = "";
  userId = JSON.parse(localStorage.getItem("user")).id;
  userRef:any;
  userPhoto:any;

  constructor(private userService:UserService, private angularFireStorage:AngularFireStorage) {}

  ngOnInit(){
    var user = JSON.parse(localStorage.getItem("user"));
    if(user === null){
      this.userName = "";
    }
    else this.userName = user.name;

    this.userRef = this.angularFireStorage.ref(`images/${this.userId}`);
    this.userRef.getDownloadURL().subscribe(
      url => {
        this.userPhoto = url
      },
      error => this.userPhoto = "/assets/images/user-default.png"
    )
  }
  
  signOut(){
    this.userService.logout();
  }
}