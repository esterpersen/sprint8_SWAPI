import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HeaderComponent } from './shared/header/header.component';
import { NavMenuComponent } from './shared/nav-menu/nav-menu.component';
import { HomeComponent } from './naus/home/home.component';

import { LlistaNausComponent } from './naus/naus/components/llista-naus/llista-naus.component';
import { FitxaNauComponent } from './naus/naus/components/fitxa-nau/fitxa-nau.component';
import { FitxaPilotComponent } from './naus/naus/components/fitxa-pilot/fitxa-pilot.component';
import { FitxaFilmComponent } from './naus/naus/components/fitxa-film/fitxa-film.component';

import { NausService } from './naus/naus/services/naus.service';

import { AuthComponent } from './auth/pages/auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LlistaNausComponent,
    FitxaNauComponent,
    NavMenuComponent,
    HeaderComponent,
    FitxaPilotComponent,
    FitxaFilmComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,
    InfiniteScrollModule,
    FormsModule, ReactiveFormsModule,
    NgbModule
  ],
  providers: [NausService, NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
