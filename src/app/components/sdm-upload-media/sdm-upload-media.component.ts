import { Component, Output, Input, EventEmitter } from '@angular/core';
import { ReportService } from '../../backend/services/report/report.service';
import * as UIkit from 'uikit';

@Component({
  selector: 'sdm-upload-media',
  templateUrl: './sdm-upload-media.component.html',
  styleUrls: ['./sdm-upload-media.component.scss']
})
export class SdmUploadMediaComponent {

  @Input() uploading:boolean;
  @Input() percentage:any;
  @Output() sendMedias: EventEmitter<any> = new EventEmitter();

  mediaAux:any;
  mediaList:Array<any> = [];

  constructor(private reportService:ReportService) {}

  selectedMedias(event){
    this.mediaAux = Array.from(event.target.files);

    if(this.mediaAux.length <= 5) {
      [].forEach.call(this.mediaAux, (media) => {
        let reader = new FileReader();
        reader.addEventListener("loadend", () => {
          let mediaBackground:string;
  
          if(media.type === "audio/mp3" || media.type === "audio/ogg" || media.type === "audio/wav"){
            mediaBackground = "url('../../../../assets/images/audio.png')";
          }
          else if(media.type === "video/mp4" || media.type === "video/avi" || media.type === "video/mpeg"){
            mediaBackground = "url('../../../../assets/images/video.png')";
          }
          else{
            mediaBackground = `url(${reader.result})`;
          }
  
          let objectMedia = {
            background: mediaBackground,
            value: media
          }
          
          if(this.mediaList.length < 5) {
            this.mediaList.push(objectMedia);
          }
          else {
            this.mediaAux.splice(this.mediaAux.indexOf(media), 1);
            this.exceededTheQuantity();
          }

          this.sendMedias.emit(this.mediaList);
        }, false);
        reader.readAsDataURL(media);
      })
      event.target.value = null;
    }
    else {
      this.mediaAux = [];
      this.exceededTheQuantity();
    }
  }

  deleteMedia(index) {
    this.mediaAux.splice(index, 1);
    this.mediaList.splice(index, 1);
    this.sendMedias.emit(this.mediaList);
  }

  exceededTheQuantity() {
    UIkit.notification({
      message: "<span uk-icon='icon: ban'></span> Apenas 5 mídias são permitidas!",
      status: "danger",
      timeout: 1500
    })
  }
}
