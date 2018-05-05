import { Component } from '@angular/core';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(){
    var config = {
      apiKey: "AIzaSyASY7GlvEimsp0Gqv1H6qvwdX_w6AI0m6Y",
      authDomain: "sidema-dd795.firebaseapp.com",
      databaseURL: "https://sidema-dd795.firebaseio.com",
      projectId: "sidema-dd795",
      storageBucket: "sidema-dd795.appspot.com",
      messagingSenderId: "874627684852"
    };
    firebase.initializeApp(config);
  }
}
