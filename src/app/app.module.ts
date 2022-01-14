import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FitxaNauComponent } from './components /fitxa-nau/fitxa-nau.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HomeComponent } from './components /home/home.component';
import { LlistaNausComponent } from './components /llista-naus/llista-naus.component';
import { NavMenuComponent } from './components /nav-menu/nav-menu.component';
import { LoginRegistreComponent } from './components /login-registre/login-registre.component';
import { NausService } from './shared/services/naus.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components /header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LlistaNausComponent,
    FitxaNauComponent,
    NavMenuComponent,
    LoginRegistreComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, InfiniteScrollModule, ReactiveFormsModule, NgbModule
  ],
  providers: [NausService],
  bootstrap: [AppComponent]
})
export class AppModule { }
