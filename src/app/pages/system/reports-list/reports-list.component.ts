import { Component, Input } from '@angular/core';
import { ReportService } from '../../../backend/services/report/report.service';
import { UserService } from '../../../backend/services/user/user.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.scss']
})
export class ReportsListComponent {

  @Input() context:string;

  reportsList:any[] = [];
  searchTag:string = "";
  filterMyReports:boolean = false;
  filterCategory:string = "Todas";
  filterSubcategory:string = "Todas";
  filterStatus:string = "Todos";
  currentRouter:any;
  scrolled:boolean = false;
  searching:boolean = false;
  gettingReports:boolean = true;
  userReports:any = null;
  getReportsError:boolean = false;

  constructor(private reportService:ReportService, private userService:UserService, private _router: Router){
    this.reportService.getReports().subscribe(
      data => {
        this.reportsList = data.reverse();
        this.gettingReports = false;
      },
      error => {
        console.log(error);
        this.getReportsError = true;
      }
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

  filterByMyReports() {
    this.filterMyReports = !this.filterMyReports;
    if(this.filterMyReports) {
      let loggedUser = JSON.parse(localStorage.getItem("user"));
      this.userService.getUserReports(loggedUser.id).subscribe(
        data => {
          this.userReports = data;
        }
      )
      return;
    }
    this.userReports = null;
    return;
  }

  filterByCategory() {
    if(this.filterCategory !== "Todas") {
      return this.filterCategory;
    }
    this.filterCategory = "Todas";
    return "";
  }

  filterBySubcategory() {
    if(this.filterSubcategory !== "Todas") {
      return this.filterSubcategory;
    }
    this.filterSubcategory = "Todas";
    return "";
  }

  filterByStatus() {
    if(this.filterStatus !== "Todos") {
      return this.filterStatus;
    }
    this.filterStatus = "Todos";
    return "";
  }

  toggleMobileSearch() {
    this.searching = !this.searching;
  }
}