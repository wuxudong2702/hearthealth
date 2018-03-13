import { NgModule } from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ZtreeModule } from '../../../shared/ztree/ztree.module';
import {AdminZtreeComponent} from './admin-ztree.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ZtreeModule
  ],
  declarations: [
    AdminZtreeComponent
  ],
  exports: [AdminZtreeComponent],
  providers: []
})
export class AdminZtreeModule { }
