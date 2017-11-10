import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LogComponent} from './log.component';
import {LogRoutingModule} from './log-routing.module';
import {UserModule} from '../../shared/table/table.module';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    imports: [
        CommonModule,
        LogRoutingModule,
        UserModule,
        HttpClientModule
    ],
    declarations: [LogComponent]
})
export class LogModule {
}
