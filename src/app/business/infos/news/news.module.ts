import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewsComponent} from './news.component';
import {NewsRoutingModule} from './news-routing.module';
import {UserModule} from '../../../shared/table/table.module';

@NgModule({
  imports: [
    CommonModule,
    NewsRoutingModule,
    UserModule
  ],
  declarations: [NewsComponent]
})
export class NewsModule {
}
