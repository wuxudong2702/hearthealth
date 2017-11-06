import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EcgdComponent} from './ecgd.component';
import {EcgdRoutingModule} from './ecgd-routing.module';
import {UserModule} from '../../../shared/table/table.module';
import { EcgdChartComponent } from './ecgd-chart/ecgd-chart.component';
import { AngularEchartsModule } from 'ngx-echarts';



@NgModule({
    imports: [
        CommonModule,
        EcgdRoutingModule,
        UserModule,
      AngularEchartsModule
    ],
    declarations: [EcgdComponent, EcgdChartComponent]
})
export class EcgdModule {

}

