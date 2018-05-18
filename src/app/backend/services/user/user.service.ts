import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import * as UIkit from 'uikit';

@Injectable()
export class UserService {

  users:Observable<any[]>;
  user:any;

  constructor(private angularFireAuth:AngularFireAuth, private angularFireDatabase:AngularFireDatabase) {}

  createUser(name, email, password){
    this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
    .then( (result) => {
      UIkit.notification({
        message: "<span uk-icon='icon: check'></span> Usuário cadastrado com sucesso!",
        status: "success",
        timeout: 3000
      })
      this.logout();
      this.addUser(result.uid, name, email, password);
    })
    .catch( (erro) => {
      if(erro.code === "auth/email-already-in-use"){
        UIkit.notification({
          message: "<span uk-icon='icon: warning'></span> O usuário já existe",
          status: "warning",
          timeout: 3000
        })
      }
      else if(erro.code === "auth/invalid-email"){
        UIkit.notification({
          message: "<span uk-icon='icon: close'></span> O e-mail informado é inválido, tente novamente!",
          status: "danger",
          timeout: 3000
        })
      }
      else UIkit.notification({message: "<span uk-icon='icon: close'></span> Erro ao cadastrar usuário!", status: "danger", timeout: 4000});
    } );
  }

  addUser(uid, name, email, password){
    this.angularFireDatabase.database.ref("usuários").push({
      id: uid,
      name: name,
      email: email,
      password: password
    })
  }

  getUsers(){
    return this.users = this.angularFireDatabase.list("usuários").valueChanges();
  }

  login(email, password){
    if(email.length === 0 || password.length === 0){
      UIkit.notification({
        message: "<span uk-icon='icon: warning'></span> Existem campos vazios!",
        status: "warning",
        timeout: 3000
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
                UIkit.notification({
                  message: `Bem-vindo ${this.user}!`,
                  status: "success",
                  timeout: 3000
                })
                break;
              }
            }
          },
          error => console.log(error)
        )
      })
      .catch( (error) => {
        if(error.code === "auth/user-not-found"){
          UIkit.notification({
            message: "<span uk-icon='icon: close'></span> Erro, usuário não existe!",
            status: "danger",
            timeout: 3000
          })
        }
        else if(error.code === "auth/wrong-password"){
          UIkit.notification({
            message: "<span uk-icon='icon: close'></span> A senha está incorreta!",
            status: "danger",
            timeout: 3000
          })
        }
        else if(error.code === "auth/invalid-email"){
          UIkit.notification({
            message: "<span uk-icon='icon: close'></span> O e-mail é inválido ou está incorreto!",
            status: "danger",
            timeout: 3000
          })
        }
        else if(error.code === "auth/network-request-failed"){
          UIkit.notification({
            message: "<span uk-icon='icon: close'></span> Erro, sem conexão com a internet!",
            status: "danger",
            timeout: 3000
          })
        }
        else UIkit.notification({message: "<span uk-icon='icon: close'></span> Erro interno!", status: "danger", timeout: 3000})
      })
    }
  }

  loginFacebook(){
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().languageCode = "pt_BR";

    firebase.auth().signInWithPopup(provider).then( (result) => {
      var token = result.credential.accessToken;
      var user = result.user;
      console.log("TOKEN: " + token);
      console.log("USER: " + user.displayName);
      this.angularFireDatabase.database.ref("usuários").push({
        id: user.uid,
        name: user.displayName,
        email: user.email,
        provider: "Facebook"
      })
    }).catch( (error) => console.log(error.message));
  }

  loginGoogle(){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().languageCode = "pt_BR"

    firebase.auth().signInWithPopup(provider).then( (result) => {
      var token = result.credential.accessToken;
      var user = result.user;
      console.log("TOKEN: " + token);
      console.log("USER: " + user.displayName);
      this.angularFireDatabase.database.ref("usuários").push({
        id: user.uid,
        name: user.displayName,
        email: user.email,
        provider: "Google"
      })
    }).catch( (error) => console.log(error.message));
  }

  logout(){
    this.angularFireAuth.auth.signOut();
  }

  resetPassword(email){
    firebase.auth().sendPasswordResetEmail(email)
    .then( () => UIkit.notification({
      message: `<span uk-icon='icon: check'></span> Um e-mail de redefinição de senha foi enviado para: ${email}`,
      status: "primary",
      timeout: 3000
    }))
    .catch( (error) => console.log(error.code));
  }
}