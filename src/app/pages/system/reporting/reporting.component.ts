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

  // verifyCategory(category){
  //   if(category === "1"){
  //     this.categoria = "Monólitos";
  //   }
  //   else if(category === "2"){
  //     this.categoria = "Recursos Hídricos";
  //   }
  //   else if(category === "3"){
  //     this.categoria = "Vegetação";
  //   }
  //   else if(category === "4"){
  //     this.categoria = "Patrimônio";
  //   }
  // }
  
  sendReport(){
    // this.verifyCategory(this.categoria);
    this.reportService.addReport(this.titulo, this.descricao, this.endereco, this.numero, this.bairro, this.complemento, this.infrator, this.categoria, this.subcategoria, this.midia);
  }
}
