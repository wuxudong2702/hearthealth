import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {cell} from '../table-list.component';
import {DatepickerI18n, DatepickerI18nType} from '../../datepickerI18n/datepickerI18n';
import {NgbDatepickerI18n} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FormControlService} from "../table-add/form-controll.service"

@Component({
  selector: 'app-table-edit',
  templateUrl: './table-edit.component.html',
  styleUrls: ['./table-edit.component.css'],
  providers: [DatepickerI18nType, FormControlService, {provide: NgbDatepickerI18n, useClass: DatepickerI18n}]
})

export class TableEditComponent implements OnInit {

  @Input() tableEdit: boolean;
  @Input() headers: Array<cell>;
  @Input() editId: number;
  @Input() data: Array<any>;

  @Output() onEditCancle = new EventEmitter<any>();
  @Output() onSubmit = new EventEmitter<any>();

  submitData: string;
  form: FormGroup;

  constructor(private fcs:FormControlService) {
  }

  ngOnInit() {

    this.form=this.fcs.toFormGroup(this.headers);
  }

  datePickerConfig = {
    locale: 'zh-CN'
  };

  submit() {
    this.submitData=JSON.stringify(this.form.value);
    this.onSubmit.emit(this.submitData);
  }

  editCancle() {
    this.onEditCancle.emit();
  }

}



