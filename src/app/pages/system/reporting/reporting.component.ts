import { Component } from '@angular/core';
import { ReportService } from '../../../backend/services/report/report.service';

@Component({
  selector: 'reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.scss']
})
export class ReportingComponent{

  categorySelect: string;

  onChange(option){
    this.categorySelect = option;
  }

  title:string = "";
  description:string = "";
  address:string = "";
  number:number;
  neighborhood:string = "";
  complement:string = "";
  violator:string = "";
  category:string = "";
  subcategory:string = "subcategoria";
  media:string = "midias";

  constructor(private reportService:ReportService){}

  sendReport(){
    this.reportService.addReport(this.title, this.description, this.address, this.number, this.neighborhood, this.complement, this.violator, this.category, this.subcategory, this.media);
  }
  cancelReport(){

  }
}
