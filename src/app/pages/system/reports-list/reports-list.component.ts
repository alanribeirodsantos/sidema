import { Component } from '@angular/core';
import { ReportService } from '../../../backend/services/report/report.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.scss']
})
export class ReportsListComponent {

  reportsList:any[];

  constructor(private reportService:ReportService, private angularFireAuth:AngularFireAuth){
    this.reportService.getReports().subscribe(
      data => { this.reportsList = data},
      error => console.log(error)
    );
  }
}