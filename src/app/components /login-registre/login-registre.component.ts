import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Usuari } from 'src/app/shared/interfaces/usuari.interface';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login-registre',
  templateUrl: './login-registre.component.html',
  styleUrls: ['./login-registre.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class LoginRegistreComponent implements OnInit {
  constructor(private fb1: FormBuilder, private fb2: FormBuilder, private modalService: NgbModal, config: NgbModalConfig,) {
    config.centered = true;
  }

  //* PROPIETATS
  private _usuariDeProva: Usuari = {
    nom: "Josep Maria",
    cognom: "Dominguez",
    email: "jm@gmail.cat",
    passw: "3lB1nquer"
  };

  //* ELS FORMS
  loginForm: FormGroup = this.fb1.group({
    loginEmail: [null, [Validators.required, Validators.email]],
    loginPassw: [null, [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")]]
  })

  registreForm: FormGroup = this.fb2.group({
    registreNom: [null, [Validators.required, Validators.minLength(2)]],
    registreCognom: [null, [Validators.required, Validators.minLength(2)]],
    registreEmail: [null, [Validators.required, Validators.email]],
    registrePassw: [null, [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")]],
  })

  //* GETTERS 
  get usuariDeMostra(): Usuari {
    return this._usuariDeProva;
  }

  get emailUsuariDeProva(): string {
    return this.obtenir_localStorageDeProva().email;
  }

  get emailUsuariGuardat() {
    return JSON.parse(localStorage.getItem("Nou Usuari")!)?.email;
  }

  //* ON INIT
  ngOnInit(): void {
    //* GUARDAR USUARI DE PROVA AL LOCAL STORAGE
    localStorage.setItem("usuari de mostra", JSON.stringify(this.usuariDeMostra));

    //* AGAFAR USUARI DE PROVA
    setTimeout(() => {
      console.log("Usuari de prova: ", this.obtenir_localStorageDeProva());
    }, 1000);

    //* CANVIS ALS FORMS
    this.loginForm.valueChanges.subscribe((x) => { });
    this.registreForm.valueChanges.subscribe((x) => { });
  }

  //* MÈTODES
  private obtenir_localStorageDeProva(): Usuari {
    let usuariDeMostra = JSON.parse(localStorage.getItem("usuari de mostra")!);
    return usuariDeMostra;
  }

  gravar_localStorage(user: Usuari) {
    localStorage.setItem("Nou Usuari", JSON.stringify(user));
  }

  trobarEmailLogin() {
    let emailEntrat: string = this.loginForm.value.loginEmail;

    console.log("emailEntrat: ", emailEntrat, " - emailUsuariGuardat: ", this.emailUsuariGuardat, " - emailUsuariDeProva: ", this.emailUsuariDeProva);

    this.compararEmails("loginForm", emailEntrat, this.emailUsuariDeProva, this.emailUsuariGuardat);
  }

  guardarNouUsuariAlLocalStorage() {
    let newUsuari: Usuari = {
      nom: this.registreForm.value.registreNom,
      cognom: this.registreForm.value.registreCognom,
      email: this.registreForm.value.registreEmail,
      passw: this.registreForm.value.registrePassw
    }

    let emailEntrat: string = this.registreForm.value.registreEmail;

    console.log("emailEntrat: ", emailEntrat, " - emailUsuariGuardat: ", this.emailUsuariGuardat, " - emailUsuariDeProva: ", this.emailUsuariDeProva);

    let esPotCrearUsuari: boolean = this.compararEmails("registreForm", newUsuari.email, this.emailUsuariDeProva, this.emailUsuariGuardat);

    if (esPotCrearUsuari) {
      this.gravar_localStorage(newUsuari);
      console.log("Usuari registrat: ", JSON.parse(localStorage.getItem("Nou Usuari")!));
    } else {
      console.log("no s'ha guardat l'usuari.");
      console.log("Últim usuari creat: ", JSON.parse(localStorage.getItem("Nou Usuari")!));
    }
  }

  compararEmails(deQuinForm: string, primerEmail: string, segonEmail: string, tercerEmail?: string): boolean {

    switch (deQuinForm) {
      case "loginForm":
        if (primerEmail === tercerEmail) {
          console.log("Aquest usuari ja existeix. Login OK.");
          return true;
        } else if (primerEmail === segonEmail) {
          console.log("Aquest és l'usuari de prova. Login OK.");
          return true;
        } else {
          console.log("Aquest usuari no està registrat. Si us plau, crea un usuari.");
          return false;
        }
      case "registreForm":
        if (primerEmail === tercerEmail) {
          console.log("Aquest usuari ja existeix. Si us plau entra amb el teu usuari.");
          return false;
        } else if (primerEmail === segonEmail) {
          console.log("Aquest és l'usuari de prova. Registra't amb un altre mail.");
          return false;
        } else {
          console.log("Aquest usuari no estava registrat. Registre OK.");
          return true;
        }
      default:
        return false;
    }
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content);
  }

  reset(form: FormGroup) {
    form.reset();
  }
}
