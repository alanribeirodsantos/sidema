import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, snapshotChanges } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import * as firebase from 'firebase';
import * as UIkit from 'uikit';
import { Router } from '@angular/router';

@Injectable()
export class UserService {

  users:Observable<any[]>;
  user:any;
  userReports:Observable<any[]>;
  userBoostedReports:Observable<any[]>;
  storageRef:AngularFireStorageReference;
  taskUpload:AngularFireUploadTask;
  percentage:any;
  flag:number = 0;
  hasPhoto:boolean;
  loggedFacebook:boolean = false;
  loggedGoogle:boolean = false;
  userFacebookPhoto:any;
  userGooglePhoto:any;

  constructor(private angularFireAuth:AngularFireAuth, private angularFireDatabase:AngularFireDatabase, private router:Router, private angularFireStorage:AngularFireStorage) {}

  createUser(name, email, password){
    this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
    .then( (result) => {
      UIkit.notification({
        message: "<span uk-icon='icon: check'></span> Usuário cadastrado com sucesso!",
        status: "success",
        timeout: 1500
      })
      this.addUser(result.uid, name, email, password);
    })
    .catch( (erro) => {
      if(erro.code === "auth/email-already-in-use"){
        UIkit.notification({
          message: "<span uk-icon='icon: warning'></span> O usuário já existe",
          status: "warning",
          timeout: 1500
        })
      }
      else if(erro.code === "auth/invalid-email"){
        UIkit.notification({
          message: "<span uk-icon='icon: ban'></span> O e-mail informado é inválido, tente novamente!",
          status: "danger",
          timeout: 1500
        })
      }
      else UIkit.notification({message: "<span uk-icon='icon: ban'></span> Erro ao cadastrar usuário!", status: "danger", timeout: 4000});
    } );
  }

  addUser(uid, name, email, password){
    this.angularFireDatabase.database.ref("usuários").child(uid).set({
      id: uid,
      name: name,
      email: email,
      password: password
    }).then( () => {
      window.setTimeout( () => {
        this.login(email, password);
      }, 2000);
    }).catch( (error) => console.log(error) );
  }

  getUsers(){
    return this.users = this.angularFireDatabase.list("usuários").valueChanges();
  }

  updateUser(name, email, newPassword, profilePic){
    var users:any;
    var user = JSON.parse(localStorage.getItem("user"));
    this.getUsers().subscribe(
      data => {
        users = data;
        for(let u in users){
          if(users[u].id === user.id){
            if(users[u].name !== name && name.length > 0){
              this.angularFireDatabase.object(`/usuários/${user.id}/name`).set(name)
              .then( () => {
                var userLocal = JSON.parse(localStorage.getItem("user"));
                userLocal.name = name;
                localStorage.setItem("user", JSON.stringify(userLocal));               
              }).catch( (error) => console.log(error.message));
            }
            else if(users[u].email !== email && email.length > 0){
              this.angularFireDatabase.object(`/usuários/${user.id}/email`).set(email)
              .then( () => {
                var userLocal = JSON.parse(localStorage.getItem("user"));
                userLocal.email = email;
                localStorage.setItem("user", JSON.stringify(userLocal));
              }).catch( (error) => console.log(error.code));
            }
            else if(newPassword.length > 0){
              if(users[u].password !== undefined){
                this.angularFireDatabase.object(`/usuários/${user.id}/password`).set(newPassword)
                .then( () => {
                  console.log("update pass");
                }).catch( (error) => console.log(error.code));
              }
            }
            break;
          }
          if(profilePic !== undefined){
              var userId = JSON.parse(localStorage.getItem("user")).id;
              this.storageRef = this.angularFireStorage.ref(`/images/${userId}`);
              this.storageRef.put(profilePic).downloadURL().subscribe(
                data => {
                  window.setTimeout( () => {
                    window.location.reload();
                    this.router.navigateByUrl("/sistema");
                  }, 7000);
                }
              );
          }
          else {
            window.setTimeout( () => {
              window.location.reload();
              this.router.navigateByUrl("/sistema");
            }, 7000);
          }
        }
      },
      error => console.log(error)
    )
  }

  login(email, password){
    if(email.length === 0 || password.length === 0){
      UIkit.notification({
        message: "<span uk-icon='icon: warning'></span> Existem campos vazios!",
        status: "warning",
        timeout: 1500
      })
    }
    else {
      var users:any;
      this.getUsers().subscribe(
        data => {
          users = data;
          for(let u in users){
            if(users[u].email === email && users[u].password === password){
              this.user = users[u].name;
              var userLogged = {
                id: users[u].id,
                name: users[u].name,
                email: users[u].email
              }
              localStorage.setItem("user", JSON.stringify(userLogged));
              this.router.navigateByUrl("/sistema/denuncias");
              this.flag = 1;
              break;
            }
          }
          if(this.flag !== 1){
            UIkit.notification({
              message: "<span uk-icon='icon: ban'></span> Erro ao efetuar login, verifique suas credenciais!",
              status: "danger",
              timeout: 1500
            });
          }
        },
        error => console.log(error)
      )
    }
  }

  loginFacebook(){
    var provider = new firebase.auth.FacebookAuthProvider();
    var flag = 0;
    firebase.auth().languageCode = "pt_BR";

    firebase.auth().signInWithPopup(provider).then( (result) => {
      var token = result.credential.accessToken;
      var user = result.user;
      this.loggedFacebook = true;
      this.userFacebookPhoto = result.user.photoURL;
      console.log(result.user);
      var users:any;
      this.getUsers().subscribe(
        data => {
          users = data;
          for(let u in users){
            if(users[u].email === user.email){
              this.user = users[u].name;
              var userLogged = { 
                id: users[u].id,
                name: users[u].name,
                email: users[u].email,
              }
              localStorage.setItem("user", JSON.stringify(userLogged));
              flag = 1;
              break;
            }
          }
          if(flag === 0){
            this.angularFireDatabase.database.ref("usuários").push({
              id: user.uid,
              name: user.displayName,
              email: user.email,
              provider: "Facebook"
            })
          }
          
          this.router.navigateByUrl("/sistema/denuncias");
        },
        error => console.log(error)
      )
    }).catch( (error) => console.log(error.message));
  }

  loginGoogle(){
    var provider = new firebase.auth.GoogleAuthProvider();
    var flag = 0;
    firebase.auth().languageCode = "pt_BR"

    firebase.auth().signInWithPopup(provider).then( (result) => {
      var token = result.credential.accessToken;
      var user = result.user;
      this.loggedGoogle = true;
      this.userGooglePhoto = result.user.photoURL;
      var users:any;
      this.getUsers().subscribe(
        data => {
          users = data;
          for(let u in users){
            if(users[u].email === user.email){
              this.user = users[u].name;
              var userLogged = { 
                id: users[u].id,
                name: users[u].name,
                email: users[u].email,
              }
              localStorage.setItem("user", JSON.stringify(userLogged));
              flag = 1;
              break;
            }
          }
          if(flag === 0){
            this.angularFireDatabase.database.ref("usuários").push({
              id: user.uid,
              name: user.displayName,
              email: user.email,
              provider: "Google"
            })
          }
          this.router.navigateByUrl("/sistema/denuncias");
        },
        error => console.log(error)
      )
    }).catch( (error) => console.log(error.message));
  }

  logout(){
    this.angularFireAuth.auth.signOut().then( () => {
      localStorage.setItem("user", "null");     
    });
  }

  resetPassword(email){
    firebase.auth().sendPasswordResetEmail(email)
    .then( () => UIkit.notification({
      message: `<span uk-icon='icon: check'></span> Um e-mail de redefinição de senha foi enviado para: ${email}`,
      status: "primary",
      timeout: 1500
    }))
    .catch( (error) => console.log(error.code));
  }

  getUserReports(userId){
    return this.userReports = this.angularFireDatabase.list(`usuários/${userId}/reports`).valueChanges();
  }
  
  getUserBoostedReports(userId){
    return this.userBoostedReports = this.angularFireDatabase.list(`usuários/${userId}/boostedReports`).valueChanges();
  }

  removeProfilePic(userId){
    this.angularFireStorage.ref("/images").child(userId).delete();
    window.setTimeout( () => {
      location.reload();
      this.router.navigateByUrl("/sistema");
    }, 3000);
  }
}