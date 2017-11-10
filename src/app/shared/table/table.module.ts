import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PaginationModule} from '../pagination/pagination.module';
import {CPipePipe, TableListComponent} from './table-list.component';
import { TableAddComponent } from './table-add/table-add.component';
import {DpDatePickerModule} from 'ng2-date-picker';
import  { DatepickerI18nModule} from '../datepickerI18n/datepickerI18n.module';
import { InputComponent } from './table-add/input/input.component';
import { environment } from '../../../environments/environment';
// import { enableProdMode } from '@angular/core';
// if (environment.production) {
//   enableProdMode();
// }
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
//
// import { AppModule } from '../../app.module';
// // import { environment } from './environments/environment';
// platformBrowserDynamic().bootstrapModule(AppModule);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule,
    DpDatePickerModule,
    DatepickerI18nModule,
  ],
  declarations: [
    CPipePipe,
    TableListComponent,
    TableAddComponent,
    InputComponent
  ],
  exports: [TableListComponent],
  providers: []
})
export class UserModule {
}
