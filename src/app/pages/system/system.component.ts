import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent {

  constructor(private renderer: Renderer2) {
  }

  isMenuOpen:boolean = false;
  isMenuClosed:boolean = true;

  openMenu() {
    this.isMenuOpen = true;
    this.isMenuClosed = false;

    if (this.isMenuOpen == true) {
      this.renderer.addClass(document.body, 'overflow-fix');
    }
  }

  exitMenu() {
    this.isMenuOpen = false;
    this.isMenuClosed = true;

    if (this.isMenuOpen == false) {
      this.renderer.removeClass(document.body, 'overflow-fix');
    }
  }

  private swipeCoord?: [number, number];
  private swipeTime?: number;

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
        this.openMenu();

      } else if (duration < 1000 && (Math.abs(direction[0]) > 30) && Math.abs(direction[0]) > Math.abs(direction[1] * 3) && direction[0] < direction[1]) {
        this.exitMenu();
      }
    }
  }
}