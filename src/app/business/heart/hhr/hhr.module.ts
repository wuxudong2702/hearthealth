import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HhrComponent} from './hhr.component';
import {HhrRoutingModule} from './hhr-routing.module';
import {TableModule} from '../../../shared/table/table.module';
import {AngularEchartsModule} from 'ngx-echarts';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DpDatePickerModule} from 'ng2-date-picker';
import {FormsModule} from '@angular/forms';
import  { DatepickerI18nModule} from '../../../shared/datepickerI18n/datepickerI18n.module';
import { HhrChartComponent } from './hhr-chart/hhr-chart.component';//日期i18n
import {HttpClientModule} from '@angular/common/http';


@NgModule({
    imports: [
        CommonModule,
        HhrRoutingModule,
        TableModule,
        NgbModule,
        DpDatePickerModule,
        DatepickerI18nModule,
        AngularEchartsModule,
        FormsModule,
        HttpClientModule
    ],
    declarations: [HhrComponent, HhrChartComponent]

})
export class HhrModule {
}
