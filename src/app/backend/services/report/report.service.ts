import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import * as UIkit from 'uikit';
import { Router } from '@angular/router';

@Injectable()
export class ReportService {

  reports:Observable<any[]>;
  log:Observable<any[]>;
  comments:Observable<any[]>;
  medias:Observable<any[]>;
  storageRef:AngularFireStorageReference;
  taskUpload:AngularFireUploadTask;
  percentage:any;

  constructor(private angularFireAuth:AngularFireAuth, private angularFireDatabase:AngularFireDatabase, private angularFireStorage:AngularFireStorage, private router:Router) {}
  
  addReport(title, description, address, number, neighborhood, complement, violator, category, subcategory, media, mediaSize, date, hour){
    var id = this.angularFireDatabase.database.ref().push().key;
    this.angularFireDatabase.database.ref("denúncias").child(id).set({
      id: id,
      title: title,
      description: description,
      location: `${address}, ${number} - ${neighborhood}`,
      address: address,
      neighborhood: neighborhood,
      number: number,
      complement: complement,
      violator: violator,
      category: category,
      subcategory: subcategory,
      numberOfSupporters: 0,
      status: "received",
      date: date,
      hour: hour
    }).then( () => {
      var userName = JSON.parse(localStorage.getItem("user")).name;
      this.angularFireDatabase.database.ref("denúncias").child(id).child("log").push({
        author: userName,
        date: date,
        hour: hour,
        message: "registrou a denúncia."
      })
      if(media.length > 0){
        if(mediaSize > 26214400){
          UIkit.notification({
            message: "<span uk-icon='icon: ban'></span> As mídias excedem os 25MB permitidos!",
            status: "danger",
            timeout: 1500
          })
        }
        else {
          var userId = JSON.parse(localStorage.getItem("user")).id;
          var total = 0;
          [].forEach.call(media, (element, index) => {
            this.angularFireDatabase.database.ref("denúncias").child(id).child("medias").push({
              name: element.name,
              type: element.type,
              owner: userId
            });
            this.storageRef = this.angularFireStorage.ref(`/reports/${userId}/${id}/${element.name}`);
            this.taskUpload = this.storageRef.put(element);
            this.percentage = this.taskUpload.percentageChanges();
            this.percentage.subscribe( p => {
               if(p == 100){
                  total += p; 
                  if(total === media.length * 100){
                    UIkit.notification({
                    message: "<span uk-icon='icon: check'></span> Denúncia cadastrada com sucesso!",
                    status: "success",
                    timeout: 1500
                    })
                    this.router.navigateByUrl("/sistema");
                  }
               }
            });
          }, false)
          this.angularFireDatabase.list(`usuários/${userId}/reports`).push(id);
        }
      }
      else {
        UIkit.notification({
          message: "<span uk-icon='icon: check'></span> Denúncia cadastrada com sucesso!",
          status: "success",
          timeout: 1500
        })
        var userId = JSON.parse(localStorage.getItem("user")).id;
        this.angularFireDatabase.list(`usuários/${userId}/reports`).push(id);
        this.router.navigateByUrl("/sistema");
      }
    }).catch( (error) => {
      UIkit.notification({
        message: "<span uk-icon='icon: ban'></span> Erro ao cadastrar denúncia!",
        status: "danger",
        timeout: 1500
      })
      console.log(error.message);
    });
  }

  getReports(){
    return this.reports = this.angularFireDatabase.list("denúncias").valueChanges();
  }

  commentOnReport(reportId, comment){
    this.angularFireDatabase.database.ref(`denúncias/${reportId}`).child("comments").push(comment);
  }

  boostReport(userId, reportId){
    this.angularFireDatabase.object(`denúncias/${reportId}/numberOfSupporters`)
    .query.ref.transaction( (numberOfSupporters) => {
      return numberOfSupporters + 1;
    });
    this.angularFireDatabase.database.ref(`usuários/${userId}`).child("boostedReports").child(reportId).set(reportId);
  }

  removeBoostReport(userId, reportId){
    this.angularFireDatabase.object(`denúncias/${reportId}/numberOfSupporters`)
    .query.ref.transaction( (numberOfSupporters) => {
      return numberOfSupporters - 1;
    });
    this.angularFireDatabase.object(`usuários/${userId}/boostedReports/${reportId}`).remove();
  }

  getLogReport(reportId){
    return this.log = this.angularFireDatabase.list(`denúncias/${reportId}/log`).valueChanges();
  }

  getComments(reportId){
    return this.comments = this.angularFireDatabase.list(`denúncias/${reportId}/comments`).valueChanges();
  }

  getReportMedias(reportId){
    return this.medias = this.angularFireDatabase.list(`denúncias/${reportId}/medias`).valueChanges();
  }
}