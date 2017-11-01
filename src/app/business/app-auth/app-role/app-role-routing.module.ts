import { NgModule }   from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoleComponent } from './app-role.component';

const userRoutes: Routes = [
    {
        path: '', component: AppRoleComponent,
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
export class AppRoleRoutingModule { }