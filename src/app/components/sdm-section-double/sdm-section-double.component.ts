import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sdm-section-double',
  templateUrl: './sdm-section-double.component.html',
  styleUrls: ['./sdm-section-double.component.scss']
})
export class SdmSectionDoubleComponent {

  @Input() image:string;
  @Input() color:string;
  @Input() display:string;

}
