import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminUserComponent} from './admin-user.component';
import {AdminUserRoutingModule} from './admin-user-routing.module';
import {UserModule} from '../../../shared/table/table.module';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    imports: [
        CommonModule,
        AdminUserRoutingModule,
        UserModule,
        HttpClientModule
    ],
    declarations: [AdminUserComponent]
})
export class AdminUserModule {
}
