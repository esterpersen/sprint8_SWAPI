import { Router } from '@angular/router';
import { Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Usuari } from 'src/app/auth/interface/usuari.interface';

@Injectable({
  providedIn: 'root'
})
export class AutenticacioService implements OnInit {

  constructor(private router: Router) {
    //* GUARDAR USUARI DE PROVA AL LOCAL STORAGE
    this.ngOnInit();
  }

  //* USUARI DE PROVA
  private _usuariDeProva: Usuari = {
    nom: "Josep Maria",
    cognom: "Dominguez",
    email: "jm@gmail.cat",
    passw: "3lB1nquer"
  };

  //* USUARI REGISTRAT
  private _usuariRegistrat: Usuari = {
    nom: "",
    cognom: "",
    email: "",
    passw: ""
  };

  //* GETTERS 
  get usuariDeMostra(): Usuari {
    return this._usuariDeProva;
  }
  get emailUsuariDeProva(): string {
    return this.obtenir_localStorageDeProva().email;
  }

  get usuariRegistrat(): Usuari {
    return this._usuariRegistrat;
  }
  set guardarUsuariRegistrat(user: Usuari) {
    this._usuariRegistrat = user;
  }
  get emailUsuariRegistrat() {
    return JSON.parse(localStorage.getItem("Nou Usuari")!)?.email;
  }

  ngOnInit(): void {
    //* GUARDAR USUARI DE PROVA AL LOCAL STORAGE
    localStorage.setItem("usuari de mostra", JSON.stringify(this.usuariDeMostra));

    // //* AGAFAR USUARI DE PROVA
    // console.log("Usuari de prova: ", this.obtenir_localStorageDeProva());
    this.guardarUsuariRegistrat = this.obtenirNouUsuari_localStorage();
  }

  //* MÈTODES LOCAL STORAGE
  public obtenir_localStorageDeProva(): Usuari {
    let usuariDeMostra = JSON.parse(localStorage.getItem("usuari de mostra")!);
    return usuariDeMostra;
  }

  guardarNouUsuari_localStorage(user: Usuari): void {
    localStorage.setItem("Nou Usuari", JSON.stringify(user));
  }
  public obtenirNouUsuari_localStorage(): Usuari {
    return JSON.parse(localStorage.getItem("Nou Usuari")!);
  }

  guardarLogin_localStorage(emailUser: string) {
    localStorage.setItem("Usuari logged in", JSON.stringify(emailUser));
  }
  public obtenirLogin_localStorage(): Observable<boolean> {
    return JSON.parse(localStorage.getItem("Usuari logged in")!);
  }

  public esborrarCurrentSession_localStorage() {
    localStorage.removeItem("Usuari logged in");
    localStorage.removeItem("Nou Usuari");
    localStorage.removeItem("Última Nau Vista");
  }

  //* MÈTODE LOGIN
  loginNOU(emailEntrat: string): Observable<Usuari> {
    this.compararEmails("loginForm", emailEntrat, this.emailUsuariDeProva, this.emailUsuariRegistrat).subscribe(resp => {
      if (resp = true) {
        this.guardarUsuariRegistrat = this.obtenirNouUsuari_localStorage();
        return of(this.usuariRegistrat);
      }
      return of(this.usuariDeMostra);
    });
    //si no ha trobat un usuari registrat, entrem amb el registrat que està en blanc
    return of(this.usuariRegistrat);
  }

  //* MÈTODE REGISTRE
  registre(newUsuari: Usuari) {
    this.compararEmails("registreForm", newUsuari.email, this.emailUsuariDeProva, this.emailUsuariRegistrat).subscribe(resp => {
      if (resp == true) {
        // Si es confirma que l'email entrat és nou i no està registrat, es registra l'usuari
        this.guardarUsuariRegistrat = newUsuari;
        this.guardarNouUsuari_localStorage(this.usuariRegistrat);
        alert("Usuari registrat. Si us plau fes login per desbloquejar la llista de naus.");
      }
    });
  }

  //* MÈTODE COMÚ PER TROBAR EMAILS REGISTRATS I COMPARAR-LOS AMB L'EMAIL ENTRAT
  compararEmails(deQuinForm: string, emailEscrit: string, emailUsuariDeProva: string, emailUsuariRegistrat?: string): Observable<boolean> {

    switch (deQuinForm) {

      case "loginForm":
        if (emailEscrit === emailUsuariRegistrat) {
          alert("Login OK.");
          this.guardarLogin_localStorage(emailEscrit);
          return of(true);
        } else if (emailEscrit === emailUsuariDeProva) {
          alert("Aquest és l'usuari de prova. Si us plau crea el teu propi usuari.");
          return of(true);
        } else {
          alert("Aquest usuari no està registrat. Si us plau, crea un usuari.");
          return of(false);
        }

      case "registreForm":
        if (emailEscrit === emailUsuariRegistrat) {
          alert("Aquest usuari ja existeix. Si us plau fes login amb el teu usuari.");
          return of(false);
        } else if (emailEscrit === emailUsuariDeProva) {
          alert("Aquest és l'usuari de prova. Registra't amb un altre mail.");
          return of(false);
        } else {
          this.guardarLogin_localStorage(emailEscrit);
          return of(true);
        }

      default:
        return of(false);
    }
  }

  //* MÈTODE PER SABER SI UN USUARI HA FET LOGIN
  saberSiUsuariHaFetLogIn(): Observable<boolean> {
    if (!this.obtenirLogin_localStorage()) {
      return of(false);
    }
    return of(true);
  }
}
