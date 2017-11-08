import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewsComponent} from './news.component';
import {NewsRoutingModule} from './news-routing.module';
import {UserModule} from '../../../shared/table/table.module';
import {Editorh5Module} from '../../../business-shared/H5editor/editorh5.module'

@NgModule({
  imports: [
    CommonModule,
    NewsRoutingModule,
    UserModule,
    Editorh5Module
  ],
  declarations: [NewsComponent]
})
export class NewsModule {
}
