import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sdm-report-status',
  templateUrl: './sdm-report-status.component.html',
  styleUrls: ['./sdm-report-status.component.scss']
})
export class SdmReportStatusComponent implements OnInit {

  @Input() status:string;
  statusTitle:string;

  ngOnInit() {
    this.setStatusTitle();
  }

  setStatusTitle() {
    if(this.status == "received") {
      this.statusTitle = "Recebida";
    }
    else if (this.status == "verifying-veracity") {
      this.statusTitle = "Verificando veracidade";
    }
    else if (this.status == "in-progress") {
      this.statusTitle = "Em andamento";
    }
    else if (this.status == "filed") {
      this.statusTitle = "Arquivada";
    }
    else if (this.status == "resolved") {
      this.statusTitle = "Resolvida";
    }
    else {
      throw new Error("Status not found");
    }

  }

}
