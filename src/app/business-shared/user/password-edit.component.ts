import { Component, Input, ViewEncapsulation, ViewChild } from '@angular/core';
import {Validators,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ToastService } from '../../shared/toast/toast.service';
import { ToastConfig, ToastType } from '../../shared/toast/toast-model';
import { CustomValidators } from '../../shared/custom-validator/custom-validator'
import {ApiService} from '../../business-service/api/api.service';
import {Router} from '@angular/router';

/**
 * 修改密码组件
 */
@Component({
    selector: 'c-password-edit',
    templateUrl: './password-edit.component.html',
    encapsulation: ViewEncapsulation.None,
   providers:[]
})
export class PasswordEditComponent {

    passwordEditForm: FormGroup;


    constructor(private router: Router,public activeModal: NgbActiveModal, private toastService: ToastService,private formBuilder: FormBuilder,private api:ApiService) {
        let oldPasswordFc = new FormControl('', Validators.compose([Validators.required, Validators.minLength(6),Validators.maxLength(15)]));
        let passwordFc = new FormControl('', Validators.compose([Validators.required, Validators.minLength(6),Validators.maxLength(15)]));
        let certainPasswordFc  = new FormControl('',CustomValidators.equalTo(passwordFc));

        this.passwordEditForm=this.formBuilder.group({
            oldPassword:oldPasswordFc,
            password:passwordFc,
            certainPassword:certainPasswordFc
        });
    }

    /**
     * 上传密码
     */
    ok(): void {
        if(this.passwordEditForm.valid){
            let that = this;
            this.api.reset(this.passwordEditForm.get('oldPassword').value, this.passwordEditForm.get('password').value,this.passwordEditForm.get('certainPassword').value).then(data => {
              if (data.status == 'ok') {
                const toastCfg = new ToastConfig(ToastType.SUCCESS, '', '修改成功!', 3000);
                that.toastService.toast(toastCfg);
                that.router.navigate(['/app/home']);
                this.close();
              } else {
                // const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
                // that.toastService.toast(toastCfg);
                const toastCfg = new ToastConfig(ToastType.ERROR, '','旧密码错误！', 3000);
                that.toastService.toast(toastCfg);
                // that.router.navigate(['/reset']);
              }
            }).catch(err => {
              const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
              that.toastService.toast(toastCfg);
            });
        }
    }

    /**
       * 关闭
       */
    close(): void {
        this.activeModal.dismiss({ status: 'closed' });
    }


}
