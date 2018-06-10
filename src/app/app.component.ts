import { Component } from '@angular/core';
import * as firebase from 'firebase/app';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Location, PopStateEvent } from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private router: Router, private location: Location){
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

  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];

    ngOnInit() {
        this.location.subscribe((ev:PopStateEvent) => {
            this.lastPoppedUrl = ev.url;
        });
        this.router.events.subscribe((ev:any) => {
            if (ev instanceof NavigationStart) {
                if (ev.url != this.lastPoppedUrl)
                    this.yScrollStack.push(window.scrollY);
            } else if (ev instanceof NavigationEnd) {
                if (ev.url == this.lastPoppedUrl) {
                    this.lastPoppedUrl = undefined;
                    window.scrollTo(0, this.yScrollStack.pop());
                } else
                    window.scrollTo(0, 0);
            }
        });
    }
}
