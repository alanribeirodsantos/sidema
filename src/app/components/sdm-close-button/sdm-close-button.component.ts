import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sdm-close-button',
  templateUrl: './sdm-close-button.component.html',
  styleUrls: ['./sdm-close-button.component.scss']
})
export class SdmCloseButtonComponent implements OnInit {

  routerLinkUrl:string = '';

  ngOnInit(){
    let user = JSON.parse(localStorage.getItem("user"));
    if(user !== null){
      this.routerLinkUrl = "/sistema/denuncias"
    }else{
      this.routerLinkUrl = "/consultar-denuncias"
    }  
  }
}