import { Component } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'sdm-down-arrow',
  templateUrl: './sdm-down-arrow.component.html',
  styleUrls: ['./sdm-down-arrow.component.scss']
})
export class SdmDownArrowComponent {

  scrollDown() {
    $("html, body").animate({ scrollTop: $(window).height()});
  }
}
