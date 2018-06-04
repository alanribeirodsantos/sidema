import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReportService } from '../../../backend/services/report/report.service';
import { UserService } from '../../../backend/services/user/user.service';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.scss']
})
export class ReportDetailsComponent implements OnInit, OnDestroy {

  commentary: string;
  report:any;
  user:any;
  organ:string;
  category:string;
  log:any;
  comments:any;
  medias:any;
  isMine:boolean = false;
  hasComments:boolean = false;
  hasMedia:boolean = false;
  place: "Quixadá - CE, Brasil";
  
  constructor(private reportService:ReportService, private userService:UserService, private angularFireStorage:AngularFireStorage){}

  ngOnInit(){
    this.report = JSON.parse(localStorage.getItem("report"));
    this.user = JSON.parse(localStorage.getItem("user"));
    if(this.user !== null){
      var userId = this.user.id;
      this.userService.getUserReports(userId).subscribe(
        data => {
          for(let r in data){
            if(data[r] === this.report.id){
              this.isMine = true;
            }
          }
        }
      )
    }
    this.reportService.getLogReport(this.report.id).subscribe(
      data => {
        this.log = data
      },
      error => console.log(error)
    )

    this.reportService.getComments(this.report.id).subscribe(
      data => {
        if(data.length > 0){
          this.comments = data;
          this.hasComments = true;
        }
      },
      error => console.log(error)
    )
    this.reportService.getReportMedias(this.report.id).subscribe(
      data => {
        if(data.length > 0){
          this.medias = data;
          this.hasMedia = true;
          for(let m in this.medias){
            var mediaRef = this.angularFireStorage.ref(`reports/${this.user.id}/${this.report.id}/${this.medias[m].name}`);
            mediaRef.getDownloadURL().subscribe(
              url => {
                if(this.medias[m].type === "image/jpg" || this.medias[m].type === "image/jpeg" || this.medias[m].type === "image/png"){
                  var img = document.createElement("img");
                  img.style.width = "120px";
                  img.style.height = "120px";
                  img.setAttribute("src", url);
                  document.getElementById("medias").appendChild(img);
                }
                else if(this.medias[m].type === "audio/mp3" || this.medias[m].type === "audio/wav" || this.medias[m].type === "audio/ogg"){
                  var audio = document.createElement("audio");
                  var source = document.createElement("source");
                  audio.style.width = "120px";
                  audio.style.height = "120px";
                  source.setAttribute("src", url);
                  source.setAttribute("type", this.medias[m].type);
                  audio.appendChild(source);
                  document.getElementById("medias").appendChild(audio);
                }
                else if(this.medias[m].type === "video/avi" || this.medias[m].type === "video/mp4" || this.medias[m].type === "video/mpeg"){
                  var video = document.createElement("video");
                  var source = document.createElement("source");
                  video.style.width = "120px";
                  video.style.height = "120px";
                  source.setAttribute("src", url);
                  source.setAttribute("type", this.medias[m].type);
                  video.appendChild(source);
                  document.getElementById("medias").appendChild(video);
                }
              },
              error => console.log(error)
            )
          }
        }
      },
      error => console.log(error)
    )
    this.responsibleOrgan();
  }

  ngOnDestroy(){
    localStorage.setItem("report", "null");
  }

  responsibleOrgan() {
    switch(this.report.category) {
      case 'historical-patrimony': {
        this.category = "Patrimônio Histórico";
        this.organ = "SEMA";
      }
      case 'water-resources': {
        this.category = "Recursos Hídricos";
        this.organ = "DNOCS";
      }
      case 'monoliths': {
        this.category = "Monólitos";
        this.organ = "SEDUMA";
      }
      case 'vegetation': {
        this.category = "Vegetação";
        this.organ = "SEDUMA";
      }
    }
  }

  sendCommentary(){
    let date = new Date();
    var utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes())).toJSON();
    utcDate.slice(0, 10).replace(/-/g,'/').split('/').reverse().join('/');
    var dateComment = utcDate.slice(0, 10).replace(/-/g,'/').split('/').reverse().join('/');
    var comment = {
      author: this.user.name,
      date: dateComment,
      hour: date.getHours() + 'h' + date.getMinutes() + 'min',
      message: this.commentary
    }
    this.reportService.commentOnReport(this.report.id, comment);
  }
}