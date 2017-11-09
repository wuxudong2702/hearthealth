import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EcgdComponent} from './ecgd.component';
import {EcgdRoutingModule} from './ecgd-routing.module';
import {UserModule} from '../../../shared/table/table.module';
import {EcgdChartComponent} from './ecgd-chart/ecgd-chart.component';
import {AngularEchartsModule} from 'ngx-echarts';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    EcgdRoutingModule,
    UserModule,
    AngularEchartsModule,
    HttpClientModule
  ],
  declarations: [EcgdComponent, EcgdChartComponent],
})

export class EcgdModule {

}

