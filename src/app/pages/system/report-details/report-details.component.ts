import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ReportService } from '../../../backend/services/report/report.service';
import { UserService } from '../../../backend/services/user/user.service';
import { AngularFireStorage, AngularFireStorageModule } from 'angularfire2/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.scss']
})
export class ReportDetailsComponent implements OnInit, OnDestroy {

  @Input() logged:boolean;

  commentary: string;
  report:any;
  reports:any;
  user:any;
  organ:string;
  complement:string;
  log:any;
  comments:any;
  medias:any;
  isMine:boolean = false;
  hasComments:boolean = false;
  hasMedia:boolean = false;
  place: "Quixadá - CE, Brasil";

  urlShareFacebook:string;
  urlShareTwitter:string;

  isLogged:string = '';

  constructor(private reportService:ReportService, private userService:UserService, private angularFireStorage:AngularFireStorage, private _router: Router){
    this.urlShareFacebook = "http://www.facebook.com/sharer/sharer.php?u=" + _router;
    this.urlShareTwitter = "http://twitter.com/intent/tweet?url=URL&text=" + _router;
  }

  ngOnInit(){
    this.report = JSON.parse(localStorage.getItem("report"));
    this.user = JSON.parse(localStorage.getItem("user"));
    if(this.user !== null){
      var userId = this.user.id;
      this.userService.getUserReports(userId).subscribe(
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
            var mediaRef = this.angularFireStorage.ref(`reports/${this.medias[m].owner}/${this.report.id}/${this.medias[m].name}`);
            mediaRef.getDownloadURL().subscribe(
              url => {
                if(this.medias[m].type === "image/jpg" || this.medias[m].type === "image/jpeg" || this.medias[m].type === "image/png"){
                  var img = document.createElement("img");
                  img.style.width = "120px";
                  img.style.height = "120px";
                  img.style.marginRight = "10px";
                  img.setAttribute("src", url);
                  document.getElementsByClassName("report-content__section-description")[0].appendChild(img);
                }
                else if(this.medias[m].type === "audio/mp3" || this.medias[m].type === "audio/wav" || this.medias[m].type === "audio/ogg"){
                  var audio = document.createElement("audio");
                  var source = document.createElement("source");
                  audio.style.width = "120px";
                  audio.style.height = "120px";
                  source.setAttribute("src", url);
                  source.setAttribute("type", this.medias[m].type);
                  audio.appendChild(source);
                  document.getElementById("report-content__section-description").appendChild(audio);
                }
                else if(this.medias[m].type === "video/avi" || this.medias[m].type === "video/mp4" || this.medias[m].type === "video/mpeg"){
                  var video = document.createElement("video");
                  var source = document.createElement("source");
                  video.style.width = "120px";
                  video.style.height = "120px";
                  source.setAttribute("src", url);
                  source.setAttribute("type", this.medias[m].type);
                  video.appendChild(source);
                  document.getElementById("report-content__section-description").appendChild(video);
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
    if(this.report.complement === ""){
      this.complement = "Não informado";
    }
    else this.complement = this.report.complement;

    if(this.report.category === "Patrimônio Histórico"){
      this.organ = "SEMA";
    }
    else if(this.report.category === "Recursos Hídricos"){
      this.organ = "DNOCS";
    }
    else if(this.report.category === "Monólitos"){
      this.organ = "SEDUMA";
    }
    else if(this.report.category === "Vegetação"){
      this.organ = "SEDUMA";
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

  unlinkReport(){
    this.reportService.unlinkReport(this.user.id, this.report.id);
  }

  deleteReport(){
    this.reportService.deleteReport(this.user.id, this.report.id);
  }
}