import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AngularFireStorage, AngularFireStorageModule } from 'angularfire2/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'sdm-close-button',
  templateUrl: './sdm-close-button.component.html',
  styleUrls: ['./sdm-close-button.component.scss']
})
export class SdmCloseButtonComponent implements OnInit {

  user:any;
  routerLinkUrl:string = '';

  ngOnInit(){
    this.user = JSON.parse(localStorage.getItem("user"));
    if(this.user !== null){
      this.routerLinkUrl = "/sistema/denuncias"
    }else{
      this.routerLinkUrl = "/consultar-denuncias"
    }
      
    }
}
