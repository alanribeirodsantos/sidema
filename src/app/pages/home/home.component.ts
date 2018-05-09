import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  showContent:boolean = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.showContent = true;
    }, 1000);
  }
}
