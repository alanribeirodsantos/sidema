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
  mediaAux:any;
  mediaSize:any;

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

  sendReport() {
    this.report = true;
    if(this.title.length == 0 || this.description.length == 0 || this.address.length == 0 || this.neighborhood.length == 0 || this.category.length == 0 || this.subcategory.length == 0 || this.media.length == 0){
      console.log("Existem campos de preenchimento obrigatório em branco!")
    }
    else{
      this.reportService.addReport(this.title, this.description, this.address, this.number, this.neighborhood, this.complement, this.violator, this.category, this.subcategory, this.media, this.mediaSize);
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

  selectedMedias(event){
      document.getElementById("filePicker").onclick = () => {
        event.target.value = null;
      }
      this.mediaAux = Array.from(event.target.files);
      [].forEach.call(this.mediaAux, (media, index) => {
        console.log(this.mediaAux);
        this.mediaSize += media.size;
        var reader = new FileReader();
        reader.addEventListener("load", () => {
          var div = document.createElement("div");
          div.style.width = "100px";
          div.style.height = "100px";
          div.addEventListener("click", () => {
            div.parentNode.removeChild(div);
            this.mediaAux.splice(index, 1);
            this.media.splice(this.media.indexOf(media), 1);
          })
          if(media.type === "audio/mp3" || media.type === "audio/ogg" || media.type === "audio/wav"){
            div.style.background = "url('../../../assets/images/audio.png') no-repeat";
            div.style.backgroundSize = "cover";
          }
          else if(media.type === "video/mp4" || media.type === "video/avi" || media.type === "video/mpeg"){
            div.style.background = "url('../../../assets/images/video.png') no-repeat";
            div.style.backgroundSize = "cover";
          }
          else{
            div.style.background = `url(${reader.result}) no-repeat`;
            div.style.backgroundSize = "cover";
          }
          document.getElementsByClassName("list-media")[0].appendChild(div);
        }, false);
        reader.readAsDataURL(media);
      })
      this.media = this.media.concat(this.mediaAux);
  }
}