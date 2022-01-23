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

  //* GETTERS 
  get usuariDeMostra(): Usuari {
    return this._usuariDeProva;
  }

  get emailUsuariDeProva(): string {
    return this.obtenir_localStorageDeProva().email;
  }

  get emailUsuariRegistrat() {
    return JSON.parse(localStorage.getItem("Nou Usuari")!)?.email;
  }

  ngOnInit(): void {
    //* GUARDAR USUARI DE PROVA AL LOCAL STORAGE
    localStorage.setItem("usuari de mostra", JSON.stringify(this.usuariDeMostra));

    //* AGAFAR USUARI DE PROVA
    setTimeout(() => {
      console.log("Usuari de prova: ", this.obtenir_localStorageDeProva());
    }, 1000);
  }

  //* MÈTODES LOCAL STORAGE
  private obtenir_localStorageDeProva(): Usuari {
    let usuariDeMostra = JSON.parse(localStorage.getItem("usuari de mostra")!);
    return usuariDeMostra;
  }

  guardarNouUsuari_localStorage(user: Usuari): void {
    localStorage.setItem("Nou Usuari", JSON.stringify(user));
  }

  private obtenirNouUsuari_localStorage(): Usuari {
    return JSON.parse(localStorage.getItem("Nou Usuari")!);
  }

  guardarLogin_localStorage(emailUser: string) {
    localStorage.setItem("Usuari logged in", JSON.stringify(emailUser));
  }

  private obtenirLogin_localStorage(): Observable<boolean> {
    return JSON.parse(localStorage.getItem("Usuari logged in")!);
  }

  //* MÈTODE LOGIN
  login(emailEntrat: string): Observable<boolean> {
    return this.compararEmails("loginForm", emailEntrat, this.emailUsuariDeProva, this.emailUsuariRegistrat);
  }

  //* MÈTODE REGISTRE
  registre(newUsuari: Usuari) {
    // console.log("emailEntrat: ", newUsuari.email, " - emailUsuariRegistrat: ", this.emailUsuariRegistrat, " - emailUsuariDeProva: ", this.emailUsuariDeProva);

    this.compararEmails("registreForm", newUsuari.email, this.emailUsuariDeProva, this.emailUsuariRegistrat).subscribe(resp => {
      if (resp == true) {
        this.guardarNouUsuari_localStorage(newUsuari);
        console.log("Usuari registrat OK: ", this.obtenirNouUsuari_localStorage());
      } else {
        console.log("No s'ha guardat l'usuari. Últim usuari creat: ", this.obtenirNouUsuari_localStorage());
      }
    });
  }

  //* MÈTODE COMÚ PER TROBAR EMAILS REGISTRATS I COMPARAR-LOS AMB L'EMAIL ENTRAT
  compararEmails(deQuinForm: string, primerEmail: string, segonEmail: string, tercerEmail?: string): Observable<boolean> {

    switch (deQuinForm) {

      case "loginForm":
        if (primerEmail === tercerEmail) {
          console.log("Aquest usuari ja existeix. Login OK.");
          this.guardarLogin_localStorage(primerEmail);
          return of(true);
        } else if (primerEmail === segonEmail) {
          console.log("Aquest és l'usuari de prova. Login OK.");
          this.guardarLogin_localStorage(segonEmail);
          return of(true);
        } else {
          console.log("Aquest usuari no està registrat. Si us plau, crea un usuari.");
          this.router.navigate(['./auth/regModal']);
          return of(false);
        }

      case "registreForm":
        if (primerEmail === tercerEmail) {
          console.log("Aquest usuari ja existeix. Si us plau entra amb el teu usuari.");
          this.router.navigate(['./auth/logModal']);
          return of(false);
        } else if (primerEmail === segonEmail) {
          console.log("Aquest és l'usuari de prova. Registra't amb un altre mail.");
          return of(false);
        } else {
          this.guardarLogin_localStorage(primerEmail);
          console.log("Aquest usuari no estava registrat. Registre OK. Login OK.");
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
