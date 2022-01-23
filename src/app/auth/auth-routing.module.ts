import { LogModalComponent } from './pages/log-reg-modals/log-modal.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegModalComponent } from './pages/log-reg-modals/reg-modal.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'logModal', 
        component: LogModalComponent
      },
      {
        path: 'regModal', 
        component: RegModalComponent
      },
      {
        path: '**',
        redirectTo: 'login'
      }
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
