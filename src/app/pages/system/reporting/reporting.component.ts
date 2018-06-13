import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../backend/services/report/report.service';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import * as UIkit from 'uikit';
import { Router } from '@angular/router';

@Component({
  selector: 'reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.scss']
})
export class ReportingComponent implements OnInit {

  constructor(private reportService:ReportService, private http:Http, private _router: Router) {
    this.router = _router;
  }

  pickedUp: boolean = true;
  router;
  report: boolean = false;
  localizationInfo;
  categorySelect: string;
  location: any;
  title:string = "";
  description:string = "";
  address:string;
  number:number;
  neighborhood:string = "";
  complement:string = "";
  violator:string = "";
  category:string = "";
  subcategory:string = "";
  media:Array<any> = [];
  mediaSize:any;
  checkbox:boolean = false;
  hour = new Date().toLocaleTimeString('pt-BR', {hour: "numeric", minute: "numeric"});

  ngOnInit(){
    if(navigator.geolocation){
       navigator.geolocation.getCurrentPosition(position => {
         this.location = position.coords;
         this.pickedUp = false;
         console.log('Localização Adquirida!')
       });
    }
  }

  onChange(option) {
    this.categorySelect = option;
  }

  sendReport() {
    this.report = true;
    if(this.title.length == 0 || this.description.length == 0 || this.address.length == 0 || this.neighborhood.length == 0 || this.category.length == 0 || this.subcategory.length == 0 || this.media.length == 0){
      UIkit.notification({
        message: "<span uk-icon='icon: ban'></span> Existem campos obrigatórios em branco!",
        status: "danger",
        timeout: 1500
      })
    }
    else{
      let date = new Date();
      var utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes())).toJSON();
      utcDate.slice(0, 10).replace(/-/g,'/').split('/').reverse().join('/');
      var dateReport = utcDate.slice(0, 10).replace(/-/g,'/').split('/').reverse().join('/');
      this.reportService.addReport(this.title, this.description, this.address, this.number, this.neighborhood, this.complement, this.violator, this.category, this.subcategory, this.media, this.mediaSize, dateReport, this.hour, this.checkbox);
    }
  }

  getLocalization() {
    let url: string = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + this.location.latitude + "," + this.location.longitude;
    this.http.get(url).map(data => {
      return this.localizationInfo = data.json()
    }).subscribe();

    setTimeout(()=>{
      this.address = this.localizationInfo.results[0].address_components[1].long_name;
      this.neighborhood = this.localizationInfo.results[0].address_components[2].long_name,
      500
    });
  }

  check() {
    this.checkbox = !this.checkbox;
    console.log(this.checkbox);
  }

  saveMedias(event) {
    this.media = [];
    for(let i in event) {
      this.media.push(event[i].value);
      this.mediaSize += event[i].value.size;
    }
    console.log(this.media);
  }
}