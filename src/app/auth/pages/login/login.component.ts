import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AutenticacioService } from '../../service/autenticacio.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private autenticService: AutenticacioService, public activeModal: NgbActiveModal, private router: Router, private route: ActivatedRoute) { }

  //* EL FORM
  loginForm: FormGroup = this.fb.group({
    loginEmail: [null, [Validators.required, Validators.email]],
    loginPassw: [null, [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")]]
  })

  ngOnInit(): void { }

  //* MÈTODES 
  login() {
    let emailEntrat: string = this.loginForm.value.loginEmail;

    this.autenticService.login(emailEntrat).subscribe(resp => {
      if (resp) {
        console.log("resp ha tornat ", resp);
        this.router.navigate(['/llista-naus']); //Aquí no entra
      }
    });
  }

  reset(form: FormGroup) {
    form.reset();
  }

}
