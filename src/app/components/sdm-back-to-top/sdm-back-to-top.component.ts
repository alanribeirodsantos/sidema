import { Component } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'sdm-back-to-top',
  templateUrl: './sdm-back-to-top.component.html',
  styleUrls: ['./sdm-back-to-top.component.scss']
})
export class SdmBackToTopComponent {

  showButton:boolean = false;

  constructor() {
    let that = this;
    window.addEventListener('scroll', function(e){
      $(window).scroll(function(){
        if($(window).scrollTop() >= ($(window).height() / 2)) {
          that.showButton = true;
        }
        else {
          that.showButton = false;
        }
      });
    })
  }
}
