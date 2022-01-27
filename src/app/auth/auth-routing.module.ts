import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginRegLogOutComponent } from './pages/login-reg-logout/login-reg-logout.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'access', 
        component: LoginRegLogOutComponent, outlet: "modal"
      },
      // {
      //   path: 'regModal', 
      //   component: RegModalComponent
      // },
      // {
      //   path: '**',
      //   redirectTo: 'login'
      // }
    ]

   
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { }
