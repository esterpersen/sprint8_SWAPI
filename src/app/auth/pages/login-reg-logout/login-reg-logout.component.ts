import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuari } from '../../interface/usuari.interface';
import { AutenticacioService } from '../../service/autenticacio.service';

@Component({
  selector: 'app-login-reg-logout',
  templateUrl: './login-reg-logout.component.html',
  styleUrls: ['./login-reg-logout.component.css']
})
export class LoginRegLogOutComponent implements OnInit {

  public loggedInUserName?: string;
  public loggedInUserSurname?: string;

  constructor(private fb: FormBuilder, private autenticService: AutenticacioService, public activeModal: NgbActiveModal, private router: Router, private route: ActivatedRoute) { }

  //* FORMS
  loginForm: FormGroup = this.fb.group({
    loginEmail: [null, [Validators.required, Validators.email]],
    loginPassw: [null, [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")]]
  });

  registreForm: FormGroup = this.fb.group({
    registreNom: [null, [Validators.required, Validators.minLength(2)]],
    registreCognom: [null, [Validators.required, Validators.minLength(2)]],
    registreEmail: [null, [Validators.required, Validators.email]],
    registrePassw: [null, [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")]],
  });

  ngOnInit(): void {
    this.loggedInUserName = this.autenticService.usuariRegistrat.nom;
    this.loggedInUserSurname = this.autenticService.usuariRegistrat.cognom;
  }

  //* MÈTODES 
  login() {
    let emailEntrat: string = this.loginForm.value.loginEmail;

    this.autenticService.loginNOU(emailEntrat).subscribe(resp => {
      if (resp) {
        this.loggedInUserName = resp.nom ;
        this.loggedInUserSurname = resp.cognom;
        this.router.navigateByUrl('llista-naus');
      }
    });
  }

  registre() {
    let newUsuari: Usuari = {
      nom: this.registreForm.value.registreNom,
      cognom: this.registreForm.value.registreCognom,
      email: this.registreForm.value.registreEmail,
      passw: this.registreForm.value.registrePassw
    }

    this.autenticService.registre(newUsuari);
  }

  reset(form: FormGroup) {
    form.reset();
  }

  logout() {
    this.autenticService.esborrarCurrentSession_localStorage();
    if (!this.autenticService.usuariRegistrat == null){
    this.autenticService.usuariRegistrat.nom = "";}
    this.loggedInUserName = "";
  }
}
