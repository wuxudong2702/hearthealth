import { NgModule }   from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminRoleComponent } from './admin-role.component';

const userRoutes: Routes = [
    {
        path: '', component: AdminRoleComponent,
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
export class AdminRoleRoutingModule { }