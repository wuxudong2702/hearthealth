import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewsComponent} from './news.component';
import {NewsRoutingModule} from './news-routing.module';
import {TableModule} from '../../../shared/table/table.module';
import {Editorh5Module} from '../../../business-shared/H5editor/editorh5.module'
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    NewsRoutingModule,
    TableModule,
    Editorh5Module,
    HttpClientModule
  ],
  declarations: [NewsComponent]
})
export class NewsModule {
}
