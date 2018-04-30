import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class UserService {

  users:Observable<any[]>;
  user:any;

  constructor(private angularFireAuth:AngularFireAuth, private angularFireDatabase:AngularFireDatabase) {}

  createUser(name, email, password){
    this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
    .then( () => {
      alert("Usuário cadastrado com sucesso!");
      this.angularFireAuth.auth.signOut();
      this.addUser(name, email, password);
    })
    .catch( (erro) => {
      if(erro.code === "auth/email-already-in-use"){
        alert("O usuário já existe!");
      }
    } );
  }

  addUser(name, email, password){
    this.angularFireDatabase.database.ref("usuários").push({
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
        this.angularFireAuth.authState.subscribe( (user) => {
          let users:any;
          this.getUsers().subscribe(
            data => { 
              users = data;
              for(let u in users){
                if(users[u].email === user.email){
                  this.user = users[u].name;
                  alert("Usuário logado! Bem-vindo "+this.user);
                  this.logout();
                  break;
                }
              }              
            },
            error => console.log(error)
          )
        })
      })
      .catch( (erro) => {
        if(erro.code === "auth/user-not-found"){
          alert("Erro, usuário não existe!");
        }
        else if(erro.code === "auth/wrong-password"){
          alert("A senha está incorreta!");
        }
        else if(erro.code === "auth/invalid-email"){
          alert("O e-mail é inválido ou está incorreto!");
        }
        else if(erro.code === "auth/network-request-failed"){
          alert("Erro, sem conexão com a internet!");
        }
        else alert("Erro interno");
      })
    }
  }

  logout(){
    this.angularFireAuth.auth.signOut();
  }
}
