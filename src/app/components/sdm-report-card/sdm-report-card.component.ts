import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../backend/services/user/user.service';

@Component({
  selector: 'sdm-report-card',
  templateUrl: './sdm-report-card.component.html',
  styleUrls: ['./sdm-report-card.component.scss']
})
export class SdmReportCardComponent implements OnInit {

  @Input() logged:boolean;
  @Input() report:any;
  reports:any;
  isMine:boolean = false;
  routerLinkUrl:string = '';

  constructor(private userService:UserService){
    if (this.logged){
      this.routerLinkUrl = '/sistema/denuncia/';
    }else{
      this.routerLinkUrl = '/denuncia';
    }
  }

  ngOnInit(){
    var user = JSON.parse(localStorage.getItem("user"));
    if(user !== null){
      this.userService.getUserReports(user.id).subscribe(
        data => {
          this.reports = data;
          for(let r in this.reports){
            if(this.reports[r].idReport === this.report.id){
              this.isMine = true;
            }
          }
        }
      )
    }
  }

  referenceReport(){
    localStorage.setItem("report", JSON.stringify(this.report));
  }
}
