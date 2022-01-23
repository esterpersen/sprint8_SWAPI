import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuari } from '../../interface/usuari.interface';

import { AutenticacioService } from '../../service/autenticacio.service';

@Component({
  selector: 'app-registre',
  templateUrl: './registre.component.html',
  styleUrls: ['./registre.component.css']
})
export class RegistreComponent implements OnInit {

  constructor(private fb: FormBuilder, private autenticService: AutenticacioService, public activeModal: NgbActiveModal) { }

  //* EL FORM
  registreForm: FormGroup = this.fb.group({
    registreNom: [null, [Validators.required, Validators.minLength(2)]],
    registreCognom: [null, [Validators.required, Validators.minLength(2)]],
    registreEmail: [null, [Validators.required, Validators.email]],
    registrePassw: [null, [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")]],
  })

  ngOnInit(): void { }

  //* MÈTODES
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

}
