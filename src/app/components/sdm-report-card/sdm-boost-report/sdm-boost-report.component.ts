import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sdm-boost-report',
  templateUrl: './sdm-boost-report.component.html',
  styleUrls: ['./sdm-boost-report.component.scss']
})
export class SdmBoostReportComponent implements OnInit {

  @Input() numberOfSupporters:number;
  @Input() active:boolean;
  tootipTitle:string;

  ngOnInit(): void {
    this.changeTootipTitle();
  }

  boostReport() {
    this.active = !this.active;
    this.changeTootipTitle();
    if(!this.active) {
      this.numberOfSupporters --;
      return;
    }
    this.numberOfSupporters ++;
  }

  changeTootipTitle() {
    if(this.active){
      this.tootipTitle = "Deixar de apoiar";
      return;
    }
    this.tootipTitle = "Apoiar";
  }

}
