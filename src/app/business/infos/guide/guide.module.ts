import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GuideComponent} from './guide.component';
import {GuideRoutingModule} from './guide-routing.module';
import {TableModule} from '../../../shared/table/table.module';
import {Editorh5Module} from '../../../business-shared/H5editor/editorh5.module'
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    GuideRoutingModule,
    TableModule,
    Editorh5Module,
    HttpClientModule
  ],
  declarations: [GuideComponent]
})
export class GuideModule {
}


