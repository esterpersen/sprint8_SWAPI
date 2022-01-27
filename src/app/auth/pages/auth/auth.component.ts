import { Component, OnInit } from '@angular/core';
import { AutenticacioService } from '../../service/autenticacio.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  public loggedInUserName?: string;
  public loggedInUserSurname?: string;

  constructor(private autenticService: AutenticacioService) { }

  ngOnInit(): void {
    this.loggedInUserName = this.autenticService.usuariRegistrat.nom;
    this.loggedInUserSurname = this.autenticService.usuariRegistrat.cognom;
  }

  logout() {
    this.autenticService.esborrarCurrentSession_localStorage();
    if (!this.autenticService.usuariRegistrat == null) {
      this.autenticService.usuariRegistrat.nom = "";
    }
    this.loggedInUserName = "";
  }

}
