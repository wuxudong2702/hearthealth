import { NgModule }   from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppUserComponent } from './app-user.component';

const userRoutes: Routes = [
    {
        path: '', component: AppUserComponent,
        children: [
        ]
    }
]


@NgModule({
  imports: [
    RouterModule.forChild(userRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppUserRoutingModule { }