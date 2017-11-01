import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminUserComponent} from './admin-user.component';
import {AdminUserRoutingModule} from './admin-user-routing.module';

@NgModule({
    imports: [
        CommonModule,
        AdminUserRoutingModule
    ],
    declarations: [AdminUserComponent]
})
export class AdminUserModule {
}
