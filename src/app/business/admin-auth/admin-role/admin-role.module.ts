import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoleComponent} from './admin-role.component';
import {AdminRoleRoutingModule} from './admin-role-routing.module';

@NgModule({
    imports: [
        CommonModule,
        AdminRoleRoutingModule
    ],
    declarations: [AdminRoleComponent]
})
export class AdminRoleModule {
}
