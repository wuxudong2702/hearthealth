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
import { InputEditComponent } from './table-edit/input-edit/input-edit.component';
import { TableEditComponent } from './table-edit/table-edit.component';

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
    InputComponent,
    InputEditComponent,
    TableEditComponent
  ],
  exports: [TableListComponent,TableEditComponent,TableAddComponent],
  providers: []
})
export class TableModule {
}
