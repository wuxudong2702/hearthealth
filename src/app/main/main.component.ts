import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {HttpService} from '../shared/http/http.service';

import {MainData} from '../main/main-model';
import {ModalService} from '../shared/modal/modal.service';
import {ConfirmConfig} from '../shared/modal/modal-model';

import {AvatarCropperComponent} from '../business-shared/user/avatar-cropper.component';
import {PasswordEditComponent} from '../business-shared/user/password-edit.component';
import {AppService} from '../app.service';
import {ApiService} from '../business-service/api/api.service';
import {ToastService} from '../shared/toast/toast.service';
import {ToastConfig, ToastType} from '../shared/toast/toast-model';

import {isNullOrUndefined} from "util";


/**
 * 主体组件
 */
@Component({
    selector: 'c-main',
    templateUrl: './main.component.html',
    styleUrls: ['.//main.component.scss'],
    providers: []
})
export class MainComponent implements OnInit {

    //切换导航
    toggleDescTip: string = '点击关闭导航菜单';

    //切换导航标识
    navClose: boolean = false;

    defatltImage: string = './assets/img/user-header.png';

    //用户数据
    mainData: MainData = {
        userData: {
            name: 'admin',
            user_name: '管理员',
            avator: './assets/img/user-header.png',
        },
        menuData: [
            {
                'id': '1',
                'parentId': '0',
                'name': '心电数据',
                'keyWord': 'ecgd-data-show',
                'icon': 'fa-heart',
                'isExpend': false,
                'children': [
                    {
                        'id': '11',
                        'parentId': '1',
                        'name': '心电波形',
                        'keyWord': 'ecgd-chart-show',
                        'icon': 'fa-heartbeat',
                        'url': '/app/ecgd-chart-show'
                    }, {
                        'id': '12',
                        'parentId': '1',
                        'name': '健康档案',
                        'keyWord': 'hhr-show',
                        'icon': 'fa-files-o',
                        'url': '/app/hhr-show'
                    }
                ]
            },
            {
                'id': '2',
                'parentId': '0',
                'name': '心电设备',
                'keyWord': 'heart-dev-show',
                'icon': 'fa-gear',
                'url': '/app/heart-dev-show',
            },
            {
                'id': '3',
                'parentId': '0',
                'name': '信息管理',
                'keyWord': 'info-show',
                'icon': 'fa-info',
                'url': '/app/info-show'
            },
            {
                'id': '4',
                'parentId': '0',
                'name': 'APP升级',
                'keyWord': 'app-upgrade-show',
                'icon': 'fa-gear',
                'url': '/app/app-upgrade-show'
            },
            {
                'id': '5',
                'parentId': '0',
                'name': 'APP权限',
                'keyWord': 'app-auth',
                'icon': 'fa-user',
                'isExpend': false,
                'children': [
                    {
                        'id': '51',
                        'parentId': '5',
                        'name': 'APP用户',
                        'keyWord': 'app-user-show',
                        'icon': 'fa-user-circle-o',
                        'url': '/app/app-user-show'
                    }, {
                        'id': '52',
                        'parentId': '5',
                        'name': 'APP角色',
                        'keyWord': 'app-role-show',
                        'icon': 'fa-users',
                        'url': '/app/app-role-show'
                    }
                ]
            },
            {
                'id': '6',
                'parentId': '0',
                'name': '后台权限',
                'keyWord': 'admin-show',
                'icon': 'fa-user',
                'isExpend': false,
                'children': [
                    {
                        'id': '61',
                        'parentId': '6',
                        'name': '后台用户',
                        'keyWord': 'admin-user-show',
                        'icon': 'fa-user-circle-o',
                        'url': '/app/admin-user-show'
                    }, {
                        'id': '62',
                        'parentId': '6',
                        'name': '后台角色',
                        'keyWord': 'admin-role-show',
                        'icon': 'fa-users',
                        'url': '/app/admin-role-show'
                    }
                ]
            },
            {
                'id': '7',
                'parentId': '0',
                'name': '系统日志',
                'keyWord': 'log',
                'icon': 'fa-cube',
                'url': '/app/log'
            }
        ]
    };

    title: string = '首页';

    constructor(private router: Router,private modalService: ModalService, private ngbModalService: NgbModal, private apiService: ApiService, private toastService: ToastService) {


    }


    /**
     * 初始化
     */
    ngOnInit() {
      console.log(this.apiService.hasToken(),'hastoken');
      if(!this.apiService.hasToken()){
        console.log(this.apiService.hasToken(),'hastoken');


        this.router.navigate(['/login']);
        return;
      }
      console.log(this.apiService.hasToken(),'hastoken33');
      this.apiService.getMenu().then(data => {
        if (data['status'] == 'ok') {
          this.mainData.menuData = data['data'];
        } else {
          console.error('获取用户菜单失败', data.message )
          this.router.navigate(['/login']);
        }
      }).catch(err => {
        console.error('获取用户菜单异常', err)
        this.router.navigate(['/login']);
      });

      this.apiService.me().then(data => {
        if (data.status == 'ok') {
          this.mainData.userData = data['data'];
          if (data['data']['avator'] == null) {
            this.mainData.userData.avator = this.defatltImage;
          }
        } else {
          console.error('获取用户信息失败', data.message );
          this.router.navigate(['/login']);
        }
      }).catch(err => {
        console.error('获取用户异常', err );
        this.router.navigate(['/login']);
      });
    }

    /**
     * 切换导航
     */
    toggleNav() {
        this.navClose = !this.navClose;
        if (this.navClose) {
            this.toggleDescTip = '点击展开导航菜单';
        } else {
            this.toggleDescTip = '点击关闭导航菜单';
        }
    }

    /**
     * 跳转首页
     */
    toHome() {
        this.title = '首页';
        this.router.navigate(['/app/home']);
    }

    /**
     * 个人资料
     */
    // userInfo() {
    //     this.router.navigate(['/app/user/userInfo']);
    // }

    /**
     * 头像更换
     */
    avatarReplacement() {
        this.ngbModalService.open(AvatarCropperComponent, {size: 'lg', backdrop: 'static', keyboard: false}).result.then((result) => {
            this.apiService.me().then(data => {
                if (data.status == 'ok') {
                    this.mainData.userData = data['data'];
                    if (data['data']['avator'] == null) {
                        this.mainData.userData.avator = this.defatltImage;
                    }
                } else {
                    console.error('获取用户信息失败', data.message );
                    this.router.navigate(['/login']);
                }
            }).catch(err => {
                console.error('获取用户异常', err );
                this.router.navigate(['/login']);
            });
        }, (reason) => {

        });
    }

    /**
     * 修改密码
     */
    passwordEdit() {
        this.ngbModalService.open(PasswordEditComponent, {size: 'lg'}).result.then((result) => {

        }, (reason) => {

        });
    }


    /**
     * 退出系统
     */
    exitSys() {
        let exitSysCfg = new ConfirmConfig('您确定退出系统吗？');
        this.modalService.confirm(exitSysCfg).then((result) => {
            if (result.status == 'approved') {
              let that = this;
              this.apiService.logout().then(data => {
                if (data.status == 'ok') {
                  this.router.navigate(['/login']);
                } else {
                  console.log('data.message',data.message);
                  const toastCfg = new ToastConfig(ToastType.ERROR, ' ', data.message, 3000);
                  that.toastService.toast(toastCfg);
                }
              }).catch(err => {
                console.log('err',err);
                const toastCfg = new ToastConfig(ToastType.ERROR, ' ', err, 3000);
                that.toastService.toast(toastCfg);
              });

            }
        }, (reason) => {
        });
    }


}


