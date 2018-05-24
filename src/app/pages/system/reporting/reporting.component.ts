import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../backend/services/report/report.service';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

@Component({
  selector: 'reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.scss']
})
export class ReportingComponent implements OnInit {

  constructor(private reportService:ReportService, private http:Http) {}

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
  subcategory:string = "subcategoria";
  media:string = "midias";

  ngOnInit(){
    if(navigator.geolocation){
       navigator.geolocation.getCurrentPosition(position => {
         this.location = position.coords;
         console.log('Localização Adquirida!')
       });
    }
  }

  onChange(option) {
    this.categorySelect = option;
  }

  getLocalization() {
    let x;
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

  sendReport() {
    this.reportService.addReport(this.title, this.description, this.address, this.number, this.neighborhood, this.complement, this.violator, this.category, this.subcategory, this.media);
  }

  cancelReport() {
  }
}
