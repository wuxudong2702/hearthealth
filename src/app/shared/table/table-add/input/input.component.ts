import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {cell} from "../../table-list.component";
import {FormGroup} from '@angular/forms';
import {ApiService} from '../../../../business-service/api/api.service';
import 'rxjs/add/operator/toPromise';
import {ToastService} from '../../../toast/toast.service';
import {ToastConfig, ToastType} from '../../../toast/toast-model';
import {ConfirmConfig} from '../../../modal/modal-model';
import {ShareService} from "./share.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: []
})
export class InputComponent implements OnInit {


  @Input() field: cell;
  @Input() form: FormGroup;
  @Input() AddInput: boolean;
  @Input() treeAdd: boolean;
  @Output() onSendId = new EventEmitter<any>();
  @Output() onSendRemind = new EventEmitter<any>();
  @Output() onSendFormValue = new EventEmitter<any>();
  @Output() onSendMatchValid = new EventEmitter<any>();
  @Output() onDate = new EventEmitter<any>();

  date = '';
  isRemind: boolean = false;
  userEditFlag: boolean = false;
  remind: Array<any> = [];
  role_id: string;
  formValue: string;
  isMatch: boolean = true;
  matchUnValid: boolean = true;
  subscription: Subscription;

  constructor(private http: ApiService, private toastService: ToastService, private service: ShareService) {}

  ngOnInit(): void {
    this.subscription = this.service.Val$.subscribe(message => {
      if (this.field.key == 'password_confirmation') {
        this.isMatch = this.form.value['password'] == this.form.value['password_confirmation'];
      }
    });
  }

  change() {
    this.formValue = this.form.value;
    this.onSendFormValue.emit(this.formValue);
    if (this.field.key == 'password' || this.field.key == 'password_confirmation') {
      this.matchUnValid = this.isValid && !this.isMatch && this.isDirty && this.field.val != '';
    } else {
      this.matchUnValid = false;
    }
    this.onSendMatchValid.emit(this.matchUnValid);
    if (this.field.key == 'role_name') {
      this.isRemind = true;
      this.userEditFlag = true;
      this.http.adminsRemind(this.formValue['role_name']).then(data => {
        if (data['status'] == 'ok') {
          this.remind = data['data'].map(k => {
            return k.name;
          });
          this.onSendRemind.emit({
            remind: data['data'],
            userEditFlag: this.userEditFlag
          });
        } else {
          const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
          this.toastService.toast(toastCfg);
        }
        this.userEditFlag = false;
      }).catch(err => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
        this.toastService.toast(toastCfg);
      });
    }
  }

  get isValid() {
    // console.log(this.form.controls[this.field.key].valid,this.field.key);
    return this.form.controls[this.field.key].valid;
  }

  get isDirty() {
    return this.form.controls[this.field.key].dirty;
  }


  datePickerConfig = {
    locale: 'zh-CN',
    format: "YYYY-MM-DD"
  };

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
