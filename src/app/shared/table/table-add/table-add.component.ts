import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {cell} from '../table-list.component';
import {DatepickerI18n, DatepickerI18nType} from '../../datepickerI18n/datepickerI18n';
import {NgbDatepickerI18n} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FormControlService} from "./form-controll.service"

@Component({
  selector: 'app-table-add',
  templateUrl: './table-add.component.html',
  styleUrls: ['./table-add.component.css'],
  providers: [DatepickerI18nType, FormControlService, {provide: NgbDatepickerI18n, useClass: DatepickerI18n}]
})
export class TableAddComponent implements OnInit {

  @Input() tableAdd: boolean;
  @Input() headers: Array<cell>;

  @Output() onCancle = new EventEmitter<any>();
  @Output() onSubmit = new EventEmitter<any>();

  submitData: object;
  checkValue: boolean = false;
  form: FormGroup;

  constructor(private fcs:FormControlService) {
  }

  ngOnInit() {
    // let group: any = {};
    // this.headers.forEach(header => {
    //   group[header.key] = header.required ? new FormControl(header.pattern || '', Validators.required)
    //     : new FormControl(header.pattern || '');
    // });
    // console.log('table-add group',group);
    // this.form = new FormGroup(group);
    this.form=this.fcs.toFormGroup(this.headers);
    console.log(this.form,'000---------------')

    console.log(this.headers);

  }

  datePickerConfig = {
    locale: 'zh-CN'
  };

  submit() {
    console.log('table-add submit headers.val Array', this.headers)
    let len = this.headers.length;
    for (let i = 0; i < len; i++) {
      this.submitData[this.headers[i].key] = this.headers[i].val;
    }
    this.onSubmit.emit(this.submitData);
    console.log(this.submitData);
  }

  cancle() {
    this.onCancle.emit();
  }

  onBlur(i) {
    // event.target.placeholder='请输入关键字' ;
    // this.checkValue=true;
  }
}



