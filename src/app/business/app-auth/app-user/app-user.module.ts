import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppUserComponent} from './app-user.component';
import {AppUserRoutingModule} from './app-user-routing.module';

@NgModule({
    imports: [
        CommonModule,
        AppUserRoutingModule
    ],
    declarations: [AppUserComponent]
})
export class AppUserModule {
}
