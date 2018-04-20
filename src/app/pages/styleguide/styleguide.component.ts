import { Component } from '@angular/core';

declare var UIkit: any;

@Component({
  selector: 'styleguide',
  templateUrl: './styleguide.component.html',
  styleUrls: ['./styleguide.component.scss']
})
export class StyleguideComponent {

  showAlert(): void {
    UIkit.modal.alert('UIkit alert!');
  }

}
