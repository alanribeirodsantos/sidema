import { Component, Input, OnInit } from '@angular/core';
import { ReportService } from '../../../backend/services/report/report.service';
import { UserService } from '../../../backend/services/user/user.service';
import * as UIkit from 'uikit';

@Component({
  selector: 'sdm-boost-report',
  templateUrl: './sdm-boost-report.component.html',
  styleUrls: ['./sdm-boost-report.component.scss']
})
export class SdmBoostReportComponent implements OnInit {

  @Input() numberOfSupporters:number;
  @Input() reportId:any;
  @Input() active:boolean;
  tootipTitle:string;
  user = JSON.parse(localStorage.getItem("user"));

  constructor(private reportService:ReportService, private userService:UserService){}

  ngOnInit(): void {
    if(this.user !== null){
      var userId = JSON.parse(localStorage.getItem("user")).id;
      this.userService.getUserBoostedReports(userId).subscribe(
        data => {
          for(let r in data){
            if(data[r] === this.reportId){
              this.active = true;
            }
          }
        }
      )
    }
    this.changeTootipTitle();
  }

  boostReport() {
    if(this.user === null){
      UIkit.notification({
        message: "<span uk-icon='icon: warning'></span> Impulsionar denúncia é somente permitido para usuários logados!",
        status: "warning",
        timeout: 1500
      })
    }
    else{
      this.active = !this.active;
      var userId = JSON.parse(localStorage.getItem("user")).id;
      this.changeTootipTitle();
      if(!this.active) {
        this.reportService.removeBoostReport(userId, this.reportId);
        return;
      }
      else {
        this.reportService.boostReport(userId, this.reportId);
      }  
    }
  }

  changeTootipTitle() {
    if(this.active){
      this.tootipTitle = "Deixar de apoiar";
      return;
    }
    this.tootipTitle = "Apoiar";
  }
}
