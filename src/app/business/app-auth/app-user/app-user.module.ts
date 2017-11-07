import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppUserComponent} from './app-user.component';
import {AppUserRoutingModule} from './app-user-routing.module';
import {UserModule} from '../../../shared/table/table.module';

@NgModule({
  imports: [
    CommonModule,
    AppUserRoutingModule,
    UserModule
  ],
  declarations: [AppUserComponent]
})
export class AppUserModule {
}
