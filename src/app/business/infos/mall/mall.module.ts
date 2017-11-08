import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MallComponent} from './mall.component';
import {MallRoutingModule} from './mall-routing.module';
import {UserModule} from '../../../shared/table/table.module';
import {Editorh5Module} from '../../../business-shared/H5editor/editorh5.module'

@NgModule({
  imports: [
    CommonModule,
    MallRoutingModule,
    UserModule,
    Editorh5Module
  ],
  declarations: [MallComponent]
})

export class MallModule {
}
