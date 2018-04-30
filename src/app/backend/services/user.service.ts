import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class UserService {

  usuarios:Observable<any[]>;
  usuario:any;

  constructor(private angularFireAuth:AngularFireAuth, private angularFireDatabase:AngularFireDatabase) {}

  criarUsuario(nome, email, senha){
    this.angularFireAuth.auth.createUserWithEmailAndPassword(email, senha)
    .then( () => {
      alert("Usuário cadastrado com sucesso!");
      this.angularFireAuth.auth.signOut();
      this.cadastrarUsuario(nome, email, senha);
    })
    .catch( (erro) => {
      if(erro.code === "auth/email-already-in-use"){
        alert("O usuário já existe!");
      }
    } );
  }

  cadastrarUsuario(nome, email, senha){
    this.angularFireDatabase.database.ref("usuários").push({
      nome: nome,
      email: email,
      senha: senha
    })
  }

  recuperarUsuarios(){
    return this.usuarios = this.angularFireDatabase.list("usuários").valueChanges();
  }

  logarUsuario(email, senha){
    if(email.length === 0 || senha.length === 0){
      alert("Existem campos vazios!");
    }
    else {
      this.angularFireAuth.auth.signInWithEmailAndPassword(email, senha)
      .then( () => {
        this.angularFireAuth.authState.subscribe( (usuario) => {
          let usuarios:any;
          this.recuperarUsuarios().subscribe(
            data => { 
              usuarios = data;
              for(let u in usuarios){
                if(usuarios[u].email === usuario.email){
                  this.usuario = usuarios[u].nome;
                  alert("Usuário logado! Bem-vindo "+this.usuario);
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

  deslogarUsuario(){
    this.angularFireAuth.auth.signOut();
  }


}
