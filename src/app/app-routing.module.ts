import { FitxaNauComponent } from './components /fitxa-nau/fitxa-nau.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LlistaNausComponent } from './components /llista-naus/llista-naus.component';
import { HomeComponent } from './components /home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'llista-naus', component: LlistaNausComponent },
  { path: 'fitxa-nau/:posicioNauIndividual', component: FitxaNauComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
