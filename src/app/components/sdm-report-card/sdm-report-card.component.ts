import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../backend/services/user/user.service';

@Component({
  selector: 'sdm-report-card',
  templateUrl: './sdm-report-card.component.html',
  styleUrls: ['./sdm-report-card.component.scss']
})
export class SdmReportCardComponent implements OnInit {

  @Input() report:any;
  reports:any;
  isMine:boolean = false;
  routerLinkUrl:string = '';
  user:any;

  constructor(private userService:UserService){
    this.user = JSON.parse(localStorage.getItem("user"));
    if (this.user !== null){
      this.routerLinkUrl = '/sistema/denuncia/';
    }else{
      this.routerLinkUrl = '/denuncia';
    }
  }

  ngOnInit(){
    if(this.user !== null){
      this.userService.getUserReports(this.user.id).subscribe(
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
