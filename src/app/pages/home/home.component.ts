import { Component, OnInit, Renderer2 } from '@angular/core';
import * as UIkit from 'uikit';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger(
      'animate', [
        transition(':enter', [
          style({opacity: 0}),
          animate('500ms', style({opacity: 1}))
        ]),
        transition(':leave', [
          style({opacity: 1}),
          animate('500ms', style({opacity: 0}))
        ])
      ]
    )
  ]
})

export class HomeComponent implements OnInit {

  constructor(private renderer: Renderer2) {
  }

  showContent:boolean = false;
  isModalOpen:boolean = false;
  isModalClosed:boolean = true;
  sliderId:number = 1;

  private swipeCoord?: [number, number];
  private swipeTime?: number;

  ngOnInit(): void {
    setTimeout(() => {
      this.showContent = true;
    }, 200);
  }

  moveSlider(id) {
    this.sliderId = id;
  }

  openModal() {
    this.isModalOpen = true;
    this.isModalClosed = false;

    if (this.isModalOpen == true) {
      this.renderer.addClass(document.body, 'overflow-fix');
    }
  }

  exitModal() {
    this.isModalOpen = false;
    this.isModalClosed = true;

    if (this.isModalOpen == false) {
      this.renderer.removeClass(document.body, 'overflow-fix');
    }
  }

  swipe(e: TouchEvent, when: string): void {
    const coord: [number, number] = [e.changedTouches[0].pageX, e.changedTouches[0].pageY];
    const time = new Date().getTime();

    if (when === 'start') {
      this.swipeCoord = coord;
      this.swipeTime = time;
    }

    else if (when === 'end') {
      const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
      const duration = time - this.swipeTime;

      if (duration < 1000 && (Math.abs(direction[0]) > 30) && Math.abs(direction[0]) > Math.abs(direction[1] * 3) && direction[0] > direction[1]) {
        this.openModal();

      } else if (duration < 1000 && (Math.abs(direction[0]) > 30) && Math.abs(direction[0]) > Math.abs(direction[1] * 3) && direction[0] < direction[1]) {
        this.exitModal();
      }
    }
  }
}