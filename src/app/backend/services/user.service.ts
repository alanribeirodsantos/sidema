import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Injectable()
export class UserService {

  users:Observable<any[]>;
  user:any;

  constructor(private angularFireAuth:AngularFireAuth, private angularFireDatabase:AngularFireDatabase) {}

  createUser(name, email, password){
    this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
    .then( (result) => {
      alert("Usuário cadastrado com sucesso!");
      this.logout();
      this.addUser(result.uid, name, email, password);
    })
    .catch( (erro) => {
      if(erro.code === "auth/email-already-in-use"){
        alert("O usuário já existe!");
      }
      else if(erro.code === "auth/invalid-email"){
        alert("O e-mail informado é inválido, tente novamente!");
      }
      else alert("Erro ao cadastrar usuário!");
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
      alert("Existem campos vazios!");
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
                alert("Usuário logado! Bem-vindo "+ this.user);
                break;
              }
            }
          },
          error => console.log(error)
        )
      })
      .catch( (error) => {
        if(error.code === "auth/user-not-found"){
          alert("Erro, usuário não existe!");
        }
        else if(error.code === "auth/wrong-password"){
          alert("A senha está incorreta!");
        }
        else if(error.code === "auth/invalid-email"){
          alert("O e-mail é inválido ou está incorreto!");
        }
        else if(error.code === "auth/network-request-failed"){
          alert("Erro, sem conexão com a internet!");
        }
        else alert("Erro interno");
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
    }).catch( (error) => console.log(error.message));
  }

  logout(){
    this.angularFireAuth.auth.signOut();
  }

  resetPassword(email){
    firebase.auth().sendPasswordResetEmail(email)
    .then( () => alert("Um e-mail de redefinição de senha foi enviado para: " + email))
    .catch( (error) => console.log(error.message));
  }
}
