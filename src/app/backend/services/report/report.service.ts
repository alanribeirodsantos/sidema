import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import * as UIkit from 'uikit';

@Injectable()
export class ReportService {

  reports:Observable<any[]>;
  storageRef:AngularFireStorageReference;
  taskUpload:AngularFireUploadTask;

  constructor(private angularFireAuth:AngularFireAuth, private angularFireDatabase:AngularFireDatabase, private angularFireStorage:AngularFireStorage) {}

  addReport(title, description, address, number, neighborhood, complement, violator, category, subcategory, media, mediaSize){
    var id = this.angularFireDatabase.database.ref().push().key;
    this.angularFireDatabase.database.ref("denúncias").child(id).set({
      id: id,
      title: title,
      description: description,
      location: `${address}, ${number} - ${neighborhood}`,
      complement: complement,
      violator: violator,
      category: category,
      subcategory: subcategory,
      numberOfSupporters: 0,
      status: "received"
    }).then( () => {
      if(media !== undefined){
        if(mediaSize > 26214400){
          UIkit.notification({
            message: "<span uk-icon='icon: ban'></span> As mídias excedem os 25MB permitidos!",
            status: "danger",
            timeout: 1500
          })
        }
        else {
          var userId = JSON.parse(localStorage.getItem("user")).id;
          [].forEach.call(media, (element) => {
            this.storageRef = this.angularFireStorage.ref(`/reports/${userId}/${id}/${element.name}`);
            this.storageRef.put(element);
          }, false);
          Promise.all(media).then( () => {
            UIkit.notification({
              message: "<span uk-icon='icon: check'></span> Denúncia cadastrada com sucesso!",
              status: "success",
              timeout: 2000
            })
          })
        }
      }
      else {
        UIkit.notification({
          message: "<span uk-icon='icon: check'></span> Denúncia cadastrada com sucesso!",
          status: "success",
          timeout: 2000
        })
      }
    }).catch( (error) => {
      UIkit.notification({
        message: "<span uk-icon='icon: ban'></span> Erro ao cadastrar denúncia!",
        status: "danger",
        timeout: 2000
      })
      console.log(error.message);
    });
  }

  getReports(){
    return this.reports = this.angularFireDatabase.list("denúncias").valueChanges();
  }
}