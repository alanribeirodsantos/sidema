import { Component } from '@angular/core';

@Component({
  selector: 'sdm-header',
  templateUrl: './sdm-header.component.html',
  styleUrls: ['./sdm-header.component.scss']
})
export class SdmHeaderComponent {

  isOpen = false;

  toggleModal(event) {
    this.isOpen = !this.isOpen;
  }
}
