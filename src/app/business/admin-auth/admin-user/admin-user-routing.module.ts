import { NgModule }   from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminUserComponent } from './admin-user.component';

const userRoutes: Routes = [
    {
        path: '', component: AdminUserComponent,
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
export class AdminUserRoutingModule { }