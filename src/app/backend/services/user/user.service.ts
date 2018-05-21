import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import * as UIkit from 'uikit';
import { Router } from '@angular/router';

@Injectable()
export class UserService {

  users:Observable<any[]>;
  user:any;
  constructor(private angularFireAuth:AngularFireAuth, private angularFireDatabase:AngularFireDatabase, private router:Router) {}

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
          message: "<span uk-icon='icon: close'></span> O e-mail informado é inválido, tente novamente!",
          status: "danger",
          timeout: 1500
        })
      }
      else UIkit.notification({message: "<span uk-icon='icon: close'></span> Erro ao cadastrar usuário!", status: "danger", timeout: 4000});
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
    var users:any;
    var user = this.angularFireAuth.auth.currentUser;
    this.getUsers().subscribe(
      data => {
        users = data;
        for(let u in users){
          if(users[u].id === user.uid){
            if(users[u].name !== name){
              this.angularFireDatabase.object(`/usuários/${user.uid}/name`).set(name)
              .then( () => {
                user.updateProfile({displayName: name, photoURL: ""})
                .then( () => {
                  var userLocal = JSON.parse(localStorage.getItem("user"));
                  userLocal.name = name;
                  localStorage.setItem("user", JSON.stringify(userLocal));
                })
                .catch( (error) => console.log(error));
              }).catch( (error) => console.log(error)); 
            }
            if(users[u].email !== email){
              this.angularFireDatabase.object(`/usuários/${user.uid}/email`).set(email)
              .then( () => {
                user.updateEmail(email).then( () => {
                  var userLocal = JSON.parse(localStorage.getItem("user"));
                  userLocal.email = email;
                  localStorage.setItem("user", JSON.stringify(userLocal));
                }).catch( (error) => console.log(error));
              }).catch( () => console.log("Erro ao atualizar email"));
            }
            if(newPassword.length > 0){
              if(users[u].password !== undefined && users[u].password !== newPassword){
                this.angularFireDatabase.object(`/usuários/${user.uid}/password`).set(newPassword)
                .then( () => console.log("")).catch( () => console.log("Erro ao atualizar senha"));
              }
              user.updatePassword(newPassword).then( () => {
                var credentials = firebase.auth.EmailAuthProvider.credential(user.email, newPassword);
                user.reauthenticateWithCredential(credentials).then( () => console.log("Reauth OK")).catch( (error) => console.log(error));
              }).catch( () => console.log("Erro na troca de senha"));
            }
            break;
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
            message: "<span uk-icon='icon: close'></span> Erro, usuário não existe!",
            status: "danger",
            timeout: 1500
          })
        }
        else if(error.code === "auth/wrong-password"){
          UIkit.notification({
            message: "<span uk-icon='icon: close'></span> A senha está incorreta!",
            status: "danger",
            timeout: 1500
          })
        }
        else if(error.code === "auth/invalid-email"){
          UIkit.notification({
            message: "<span uk-icon='icon: close'></span> O e-mail é inválido ou está incorreto!",
            status: "danger",
            timeout: 1500
          })
        }
        else if(error.code === "auth/network-request-failed"){
          UIkit.notification({
            message: "<span uk-icon='icon: close'></span> Erro, sem conexão com a internet!",
            status: "danger",
            timeout: 1500
          })
        }
        else UIkit.notification({message: "<span uk-icon='icon: close'></span> Erro interno!", status: "danger", timeout: 3000})
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