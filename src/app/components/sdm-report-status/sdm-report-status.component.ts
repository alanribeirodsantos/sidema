import { Component, Input } from '@angular/core';

@Component({
  selector: 'sdm-report-status',
  templateUrl: './sdm-report-status.component.html',
  styleUrls: ['./sdm-report-status.component.scss']
})
export class SdmReportStatusComponent {

  @Input() status:string;

}
