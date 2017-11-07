import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GuideComponent} from './guide.component';
import {GuideRoutingModule} from './guide-routing.module';
import {UserModule} from '../../../shared/table/table.module';

@NgModule({
  imports: [
    CommonModule,
    GuideRoutingModule,
    UserModule
  ],
  declarations: [GuideComponent]
})
export class GuideModule {
}
