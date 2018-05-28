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
  storageRef:AngularFireStorageReference;
  taskUpload:AngularFireUploadTask;

  constructor(private angularFireAuth:AngularFireAuth, private angularFireDatabase:AngularFireDatabase, private router:Router, private angularFireStorage:AngularFireStorage) {}

  createUser(name, email, password){
    this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
    .then( (result) => {
      UIkit.notification({
        message: "<span uk-icon='icon: check'></span> Usuário cadastrado com sucesso!",
        status: "success",
        timeout: 1500
      })
      this.login(email, password);
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
    })
  }

  getUsers(){
    return this.users = this.angularFireDatabase.list("usuários").valueChanges();
  }

  updateUser(name, email, newPassword){
    var credentialsChanged = localStorage.getItem("credentialsChanged");
    if(credentialsChanged === "true"){
      this.logout();
      UIkit.notification({
        message: "<span uk-icon='icon: warning'></span> Você trocou suas credenciais recentemente! É necessário fazer login para continuar.",
        status: "warning",
        timeout: 3000
      })
    }
    else {
      var users:any;
      var user = firebase.auth().currentUser;
      this.getUsers().subscribe(
        data => {
          users = data;
          for(let u in users){
            if(users[u].id === user.uid){
              if(users[u].name !== name && name.length > 0){
                this.angularFireDatabase.object(`/usuários/${user.uid}/name`).set(name)
                .then( () => {
                  var userLocal = JSON.parse(localStorage.getItem("user"));
                  userLocal.name = name;
                  localStorage.setItem("user", JSON.stringify(userLocal));
                }).catch( (error) => console.log(error.message));
              }
              else if(users[u].email !== email && email.length > 0){
                this.angularFireDatabase.object(`/usuários/${user.uid}/email`).set(email)
                .then( () => {
                  var userLocal = JSON.parse(localStorage.getItem("user"));
                  userLocal.email = email;
                  localStorage.setItem("user", JSON.stringify(userLocal));
                  var temp = true;
                  localStorage.setItem("credentialsChanged", JSON.stringify(temp));
                }).catch( (error) => console.log(error.code));
                user.updateEmail(email).then( () => console.log("update email")).catch( (error) => console.log(error.code));
                
              }
              else if(newPassword.length > 0){
                if(users[u].password !== undefined && users[u].password !== newPassword){
                  this.angularFireDatabase.object(`/usuários/${user.uid}/password`).set(newPassword)
                  .then( () => {
                    var temp = true;
                    localStorage.setItem("credentialsChanged", JSON.stringify(temp));
                  }).catch( (error) => console.log(error.code));
                  var credentials = firebase.auth.EmailAuthProvider.credential(email, users[u].password);
                  user.reauthenticateAndRetrieveDataWithCredential(credentials).then( () => console.log("reauth pass ok")).catch( (error) => console.log(error.code));
                  user.updatePassword(newPassword).then( () => console.log("update password")).catch( (error) => console.log(error.code));
                }
              }
              break;
            }        
          }
        },
        error => console.log(error)
      )
    }
  }

  uploadProfilePic(file){
    if(file.size > 2097152){
      UIkit.notification({
        message: "<span uk-icon='icon: ban'></span> A foto excede os 2MB permitidos!",
        status: "danger",
        timeout: 1500
      })
    }
    else {
      var userId = JSON.parse(localStorage.getItem("user")).id;
      this.storageRef = this.angularFireStorage.ref(`/images/${userId}`);
      this.storageRef.put(file).snapshotChanges().toPromise()
      .then( () => {
        UIkit.notification({
          message: "<span uk-icon='icon: check'></span> Foto de perfil atualizada!",
          status: "success",
          timeout: 1500
        })
      }).catch( () => {
        UIkit.notification({
          message: "<span uk-icon='icon: ban'></span> Erro ao atualizar foto de perfil!",
          status: "danger",
          timeout: 1500
        })
      });
    }
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
      this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
      .then( () => {
        var email = this.angularFireAuth.auth.currentUser.email;
        var users:any;
        this.getUsers().subscribe(
          data => {
            users = data;
            for(let u in users){
              if(users[u].email === email){
                this.user = users[u].name;
                var userLogged = { 
                  id: users[u].id,
                  name: users[u].name,
                  email: users[u].email,
                }
                localStorage.setItem("user", JSON.stringify(userLogged));
                break;
              }
            }
            this.router.navigateByUrl("/sistema/denuncias");
          },
          error => console.log(error)
        )
      })
      .catch( (error) => {
        if(error.code === "auth/user-not-found"){
          UIkit.notification({
            message: "<span uk-icon='icon: ban'></span> Erro, usuário não existe!",
            status: "danger",
            timeout: 1500
          })
        }
        else if(error.code === "auth/wrong-password"){
          UIkit.notification({
            message: "<span uk-icon='icon: ban'></span> A senha está incorreta!",
            status: "danger",
            timeout: 1500
          })
        }
        else if(error.code === "auth/invalid-email"){
          UIkit.notification({
            message: "<span uk-icon='icon: ban'></span> O e-mail é inválido ou está incorreto!",
            status: "danger",
            timeout: 1500
          })
        }
        else if(error.code === "auth/network-request-failed"){
          UIkit.notification({
            message: "<span uk-icon='icon: ban'></span> Erro, sem conexão com a internet!",
            status: "danger",
            timeout: 1500
          })
        }
        else UIkit.notification({message: "<span uk-icon='icon: ban'></span> Erro interno!", status: "danger", timeout: 3000})
      })
    }
  }

  loginFacebook(){
    var provider = new firebase.auth.FacebookAuthProvider();
    var flag = 0;
    firebase.auth().languageCode = "pt_BR";

    firebase.auth().signInWithPopup(provider).then( (result) => {
      var token = result.credential.accessToken;
      var user = result.user;
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
      this.router.navigateByUrl("/home");
      localStorage.setItem("user", "null");
      var temp = false;
      localStorage.setItem("credentialsChanged", JSON.stringify(temp));
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
}