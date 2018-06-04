import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../backend/services/user/user.service';

@Component({
  selector: 'sdm-report-card',
  templateUrl: './sdm-report-card.component.html',
  styleUrls: ['./sdm-report-card.component.scss']
})
export class SdmReportCardComponent implements OnInit {

  @Input() report:any;
  isMine:boolean = false;

  constructor(private userService:UserService){}

  ngOnInit(){
    var user = JSON.parse(localStorage.getItem("user"));
    if(user !== null){
      this.userService.getUserReports(user.id).subscribe(
        data => {
          for(let r in data){
            if(data[r] === this.report.id){
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
