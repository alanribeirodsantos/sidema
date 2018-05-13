import { Component, Input } from '@angular/core';

@Component({
  selector: 'sdm-report-card',
  templateUrl: './sdm-report-card.component.html',
  styleUrls: ['./sdm-report-card.component.scss']
})
export class SdmReportCardComponent {

  @Input() report:any;

}
