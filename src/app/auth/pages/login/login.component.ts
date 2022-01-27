import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AutenticacioService } from '../../service/autenticacio.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loggedInUserName?: string;
  public loggedInUserSurname?: string;

  constructor(private fb: FormBuilder, private autenticService: AutenticacioService, public activeModal: NgbActiveModal, private router: Router, private route: ActivatedRoute) { }

  //* FORMS
  loginForm: FormGroup = this.fb.group({
    loginEmail: [null, [Validators.required, Validators.email]],
    loginPassw: [null, [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")]]
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
        this.loggedInUserName = resp.nom;
        this.loggedInUserSurname = resp.cognom;
      }
    });

    this.autenticService.saberSiUsuariHaFetLogIn().subscribe(resp => {
      if (resp == true) {
        this.router.navigateByUrl('llista-naus').then(() => {
          window.location.reload();
        });
      }
    })
  }

  reset(form: FormGroup) {
    form.reset();
  }

}
