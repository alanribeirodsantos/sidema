import { Component, OnInit} from '@angular/core';
import { UserService } from '../../backend/services/user/user.service';

@Component({
  selector: 'sdm-side-menu',
  templateUrl: './sdm-side-menu.component.html',
  styleUrls: ['./sdm-side-menu.component.scss']
})
export class SdmSideMenuComponent implements OnInit {
  
  userName:string = "";

  constructor(private userService:UserService) {}

  ngOnInit(){
    var user = JSON.parse(localStorage.getItem("user"));
    if(user === null){
      this.userName = "";
    }
    else this.userName = user.name;
  }
  
  signOut(){
    this.userService.logout();
  }

  editProfile(){
  
  }
}