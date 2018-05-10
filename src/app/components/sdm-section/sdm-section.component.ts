import { Component, Input } from '@angular/core';

@Component({
  selector: 'sdm-section',
  templateUrl: './sdm-section.component.html',
  styleUrls: ['./sdm-section.component.scss']
})
export class SdmSectionComponent {

  @Input() image:string;
  @Input() color:string;
  @Input() display:string;

}
