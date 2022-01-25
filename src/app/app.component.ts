import { AutenticacioService } from './auth/service/autenticacio.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SWAPI';
  loginFetdelService!: boolean;
  constructor(private authservice: AutenticacioService){  }

  ngOnInit():void {
  //  this.loginFetdelService = this.authservice.mostrarNomUsuariIBotoLogOut();
  //  console.log("patata app.com.ts ",this.loginFetdelService);
  }
}
