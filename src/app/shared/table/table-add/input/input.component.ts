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
  @Input() flag: boolean;
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
  fieldVer:string;
  constructor(private http: ApiService, private toastService: ToastService, private service: ShareService) {}

  ngOnInit(): void {
    this.subscription = this.service.Val$.subscribe(message => {
      if (this.field.key == 'password_confirmation') {
        this.isMatch = this.form.value['password'] == this.form.value['password_confirmation'];
      }
    });
    if (this.field.key == 'ver') {
      this.fieldVer=this.field.val;
    }
    // this.fieldVer=this.field.
  }
  checkVer() {
    if(this.field.key == 'ver'&&this.formValue&&this.formValue['ver']!=this.fieldVer){
      this.http.verUnique(this.formValue['ver']).then(data => {
        if (data['status'] == 'ok') {
          if(data['data']=='1'){
            const toastCfg = new ToastConfig(ToastType.ERROR, '', '此版本号已存在!', 3000);
            this.toastService.toast(toastCfg);
          }
        } else {
          const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
          this.toastService.toast(toastCfg);
        }
      }).catch(err => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
        this.toastService.toast(toastCfg);
      });
    }
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


  upload(files) {
    this.form.value[this.field.key] = files[0];
    // console.log(this.form.value[this.field.key], this.form,'form ---');
    // if (files.length === 0)
    //   return;
    //
    // let formData = new FormData();
    //
    // for (let file of files){
    //   formData.append(file.name, file);
    //   console.dir(formData);
    // }
    // const req = new HttpRequest('POST', `api/files`, formData, {
    //   reportProgress: true,
    // });
    // this.http.request(req).subscribe(event => {
    //   if (event.type === HttpEventType.UploadProgress)
    //     this.uploadProgress = Math.round(100 * event.loaded / event.total);
    //   else if (event instanceof HttpResponse)
    //     console.log('Files uploaded!');
    // });
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
