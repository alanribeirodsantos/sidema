import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import * as UIkit from 'uikit';

@Injectable()
export class ReportService {

  reports:Observable<any[]>;

  constructor(private angularFireAuth:AngularFireAuth, private angularFireDatabase:AngularFireDatabase) {}

  addReport(title, description, address, number, neighborhood, complement, violator, category, subcategort, media){
    var id = this.angularFireDatabase.database.ref().push().key;
    this.angularFireDatabase.database.ref("denúncias").child(id).set({
      id: id,
      title: title,
      description: description,
      location: `${address}, ${number} - ${neighborhood}`,
      complement: complement,
      violator: violator,
      category: category,
      subcategory: subcategort,
      media: media,
      numberOfSupporters: 0,
      status: "received"
    }).then( () => {
      UIkit.notification({
        message: "<span uk-icon='icon: check'></span> Denúncia cadastrada com sucesso!",
        status: "success",
        timeout: 2000
      })
    }).catch( () => {
      UIkit.notification({
        message: "<span uk-icon='icon: ban'></span> Erro ao cadastrar denúncia!",
        status: "danger",
        timeout: 2000
      })
    });
  }

  getReports(){
    return this.reports = this.angularFireDatabase.list("denúncias").valueChanges();
  }
}