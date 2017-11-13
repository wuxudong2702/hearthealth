import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';

import {HttpService} from '../shared/http/http.service';

import {ToastService} from '../shared/toast/toast.service';
import {ToastConfig, ToastType} from '../shared/toast/toast-model';
import {CustomValidators} from '../shared/custom-validator/custom-validator'

import {ApiService} from '../business-service/api/api.service';

@Component({
  selector: 'c-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: []
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private api: ApiService, private router: Router, private toastService: ToastService, private httpService: HttpService, private formBuilder: FormBuilder) {
    let userNameFc = new FormControl('admin', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(15)]));
    let passwordFc = new FormControl('admin', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(15)]));

    this.loginForm = this.formBuilder.group({
      userName: userNameFc,
      password: passwordFc
    });
  }

  /**
   * 初始化
   */
  ngOnInit() {

  }


  /**
   * 登录
   */
  login() {
    console.info(this.loginForm);
    if (this.loginForm.valid) {
      let that = this;
      this.api.login(this.loginForm.get('userName').value, this.loginForm.get('password').value).then(data => {
        if (data.status == 'ok') {
          const toastCfg = new ToastConfig(ToastType.SUCCESS, '', '登录成功!', 3000);
          that.toastService.toast(toastCfg);
          that.router.navigate(['/app/home']);

          // console.log('++++++++++++++++++++++++++++++++++++++++++++++++',this.api.getToken());
        } else {
          const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
          that.toastService.toast(toastCfg);
          that.router.navigate(['/login']);
        }
      }).catch(err => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
        that.toastService.toast(toastCfg);
      });
      // let that = this;
      // this.httpService.post("/api/admin/auth/login", {
      //   name: this.loginForm.get('userName').value,
      //   password:  this.loginForm.get('password').value,
      // }, function (successful, data, res) {
      //   console.info(successful);
      //   console.info(data);
      //   console.info(res);
      //   if (successful) {
      //     if(data.status == 'ok'){
      //       const toastCfg = new ToastConfig(ToastType.SUCCESS, '', '登录成功!', 3000);
      //       that.toastService.toast(toastCfg);
      //       that.router.navigate(['/app/home']);
      //     }else{
      //       const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
      //       that.toastService.toast(toastCfg);
      //       that.router.navigate(['/login']);
      //     }
      //   }
      // }, function (successful, msg, err) {
      //    const toastCfg = new ToastConfig(ToastType.ERROR, '', msg, 3000);
      //    that.toastService.toast(toastCfg);
      // });

      //
      // const toastCfg = new ToastConfig(ToastType.SUCCESS, '', '百变小咖，登录成功!', 2000);
      // this.toastService.toast(toastCfg);
      // this.router.navigate(['/app/home']);

    }
  }


}
