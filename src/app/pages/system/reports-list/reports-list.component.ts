import { Component } from '@angular/core';
import { ReportService } from '../../../backend/services/report/report.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.scss']
})
export class ReportsListComponent {

  reportsList:any[];
  searchTag:string = "";
  orderField:string = "";
  filterCategory:string = "";
  filterSubcategory:string = "";
  filterStatus:string = "";
  currentRouter:any;
  scrolled:boolean = false;
  searching:boolean = false;

  constructor(private reportService:ReportService, private _router: Router){
    this.reportService.getReports().subscribe(
      data => { this.reportsList = data.reverse()},
      error => console.log(error)
    );

    this.currentRouter = this._router.routerState.snapshot.url;
    
    let that = this;
    window.addEventListener('scroll', function(e){
      $(window).scroll(function(){
        if($(window).scrollTop() >= (130)) {
          that.scrolled = true;
        }
        else {
          that.scrolled = false;
        }
      });
    })
  }

  orderBy () {
    switch(this.orderField) {
      case "Número de apoiadores":
        return "-numberOfSupporters";
      case "Status da denúncia":
        return "status";
      case "Categoria":
        return "category";
      default:
        this.orderField = "Número de apoiadores";
        return "-numberOfSupporters";
    }
  }

  filterByCategory() {
    switch(this.filterCategory) {
      case "Monólitos":
        return "monoliths";
      case "Patrimônio histórico":
        return "historical-patrimony";
      case "Recursos hídricos":
        return "water-resources";
      case "Vegetação":
        return "vegetation";
      default:
        this.filterCategory = "Todas";
        return "";
    }
  }

  filterBySubcategory() {
    switch(this.filterSubcategory) {
      case "Poluição":
        return "pollution";
      case "Poços irregulares":
        return "irregular-wells";
      case "Desperdício de água":
        return "waste-of-water";
      case "Construção irregular":
        return "irregular-construction";
      case "Depredação":
        return "depredation";
      case "Queimadas":
        return "burns";
      case "Desmatamento":
        return "deforestation";
      case "Ocupação ilegal":
        return "illegal-occupation";
      case "Outra":
        return "other";
      default:
        this.filterSubcategory = "Todas";
        return "";
    }
  }

  filterByStatus() {
    switch(this.filterStatus) {
      case "Arquivada":
        return "filed";
      case "Em andamento":
        return "in-progress";
      case "Recebida":
        return "received";
      case "Resolvida":
        return "resolved";
      case "Verificando veracidade":
        return "verifying-veracity";
      default:
        this.filterStatus = "Todos";
        return "";
    }
  }

  toggleMobileSearch() {
    this.searching = !this.searching;
  }
}