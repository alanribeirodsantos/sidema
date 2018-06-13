import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sdm-media',
  templateUrl: './sdm-media.component.html',
  styleUrls: ['./sdm-media.component.scss']
})
export class SdmMediaComponent {

  @Input() background:string;
  @Output() deleteMedia: EventEmitter<any> = new EventEmitter();

  deleteThisMedia() {
    this.deleteMedia.emit();
  }

}
