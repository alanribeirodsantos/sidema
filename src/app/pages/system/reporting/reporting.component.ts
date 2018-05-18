import { Component } from '@angular/core';
import { ReportService } from '../../../backend/services/report/report.service';

@Component({
  selector: 'reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.scss']
})
export class ReportingComponent{

  titulo:string = "";
  descricao:string = "";
  endereco:string = "";
  numero:number;
  bairro:string = "";
  complemento:string = "";
  infrator:string = "";
  categoria:string = "";
  subcategoria:string = "subcategoria";
  midia:string = "midias";

  constructor(private reportService:ReportService){}

  sendReport(){
    this.reportService.addReport(this.titulo, this.descricao, this.endereco, this.numero, this.bairro, this.complemento, this.infrator, this.categoria, this.subcategoria, this.midia);
  }
}