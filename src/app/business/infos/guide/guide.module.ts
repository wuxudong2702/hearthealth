import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GuideComponent} from './guide.component';
import {GuideRoutingModule} from './guide-routing.module';
import {UserModule} from '../../../shared/table/table.module';
import {Editorh5Module} from '../../../business-shared/H5editor/editorh5.module'

@NgModule({
  imports: [
    CommonModule,
    GuideRoutingModule,
    UserModule,
    Editorh5Module,
  ],
  declarations: [GuideComponent]
})
export class GuideModule {
}


