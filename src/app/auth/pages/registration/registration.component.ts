import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuari } from '../../interface/usuari.interface';
import { AutenticacioService } from '../../service/autenticacio.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private fb: FormBuilder, private autenticService: AutenticacioService, public activeModal: NgbActiveModal, private router: Router, private route: ActivatedRoute) { }

  //* FORMS
  registreForm: FormGroup = this.fb.group({
    registreNom: [null, [Validators.required, Validators.minLength(2)]],
    registreCognom: [null, [Validators.required, Validators.minLength(2)]],
    registreEmail: [null, [Validators.required, Validators.email]],
    registrePassw: [null, [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")]],
  });

  ngOnInit(): void {
  }

  registre() {
    let newUsuari: Usuari = {
      nom: this.registreForm.value.registreNom,
      cognom: this.registreForm.value.registreCognom,
      email: this.registreForm.value.registreEmail,
      passw: this.registreForm.value.registrePassw
    }

    this.autenticService.registre(newUsuari);

    this.autenticService.saberSiUsuariHaFetLogIn().subscribe(resp => {
      if (resp == true) {
        this.router.navigateByUrl('llista-naus').then(() => {
          window.location.reload();
        });
      }
    });
  }

  reset(form: FormGroup) {
    form.reset();
  }

}
