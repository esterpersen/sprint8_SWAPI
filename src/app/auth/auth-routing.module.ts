import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      // {
      //   path: 'login', 
      //   component: LogModalComponent
      // },
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
