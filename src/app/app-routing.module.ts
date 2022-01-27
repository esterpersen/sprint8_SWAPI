import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { LoginRegLogOutComponent } from './auth/pages/login-reg-logout/login-reg-logout.component';
import { HomeComponent } from './naus/home/home.component';
import { FitxaNauComponent } from './naus/naus/components/fitxa-nau/fitxa-nau.component';
import { LlistaNausComponent } from './naus/naus/components/llista-naus/llista-naus.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent,
    
  },
  {
    path: 'llista-naus',
    component: LlistaNausComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  { path: 'fitxa-nau/:currentNauId', component: FitxaNauComponent },
  {
    path: 'auth',
    // loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    children: [
      { path: 'login', component: LoginRegLogOutComponent, outlet: 'modal'  }
    ]
  },
  { path: '**', redirectTo: '/home' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
