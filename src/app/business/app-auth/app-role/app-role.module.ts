import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppRoleComponent} from './app-role.component';
import {AppRoleRoutingModule} from './app-role-routing.module';

@NgModule({
    imports: [
        CommonModule,
        AppRoleRoutingModule
    ],
    declarations: [AppRoleComponent]
})
export class AppRoleModule {
}
