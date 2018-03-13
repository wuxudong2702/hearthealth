import { NgModule }   from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuideComponent } from './guide.component';

const userRoutes: Routes = [
    {
        path: '', component: GuideComponent,
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
export class GuideRoutingModule { }