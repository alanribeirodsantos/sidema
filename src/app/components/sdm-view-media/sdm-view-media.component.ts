import { Component, Input } from '@angular/core';

@Component({
  selector: 'sdm-view-media',
  templateUrl: './sdm-view-media.component.html',
  styleUrls: ['./sdm-view-media.component.scss']
})
export class SdmViewMediaComponent {

  @Input() media:any;

}
