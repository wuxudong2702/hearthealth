import { NgModule }   from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DevComponent } from './dev.component';

const userRoutes: Routes = [
    {
        path: '', component: DevComponent,
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
export class DevRoutingModule { }