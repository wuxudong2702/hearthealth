import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LogComponent} from './log.component';
import {LogRoutingModule} from './log-routing.module';

@NgModule({
    imports: [
        CommonModule,
        LogRoutingModule
    ],
    declarations: [LogComponent]
})
export class LogModule {
}
