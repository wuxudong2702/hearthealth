import { NgModule }   from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MallComponent } from './mall.component';

const userRoutes: Routes = [
    {
        path: '', component: MallComponent,
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
export class MallRoutingModule { }