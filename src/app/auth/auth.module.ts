import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './pages/login/login.component';
import { RegistreComponent } from './pages/registre/registre.component';
import { LogModalComponent } from './pages/log-reg-modals/log-modal.component';
import { RegModalComponent } from './pages/log-reg-modals/reg-modal.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegistreComponent,
    LogModalComponent, 
    RegModalComponent
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
