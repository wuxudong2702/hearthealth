import {Component, OnInit} from '@angular/core';
import {
  cell,
  SortDirection,
  sortObj,
  DataType,
  INPUTTYPE,
  searchObj,
  paginationObj, params
} from '../../../shared/table/table-list.component';
import {HttpClient} from "@angular/common/http";
import {ApiService} from '../../../business-service/api/api.service';
import 'rxjs/add/operator/toPromise';
import {ToastService} from '../../../shared/toast/toast.service';
import {ToastConfig, ToastType} from '../../../shared/toast/toast-model';
import {ConfirmConfig} from '../../../shared/modal/modal-model';
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css'],
  providers: []
})

export class AdminUserComponent implements OnInit {

  constructor(private router: Router, private http: ApiService, private toastService: ToastService) {

  }

  ngOnInit() {
    if(this.http.hasToken()){
        this.headers = this.http.getHeader('admins');
      this.params['page']='1';
      this.getHeartData(this.url,this.params);
        this.http.isHavePerm('admin-user-del').then(v => {
            this.deleteBtn = v;
            this.deleteAllBtn = v;
        });
        this.http.isHavePerm('admin-user-edit').then(v => {
            this.editBtn = v;
        });
        this.http.isHavePerm('admin-user-add').then(v => {
            this.addBtn = v;
        });
    }
  }

  nodes: any;
  headers: Array<cell> = [];
  headerAdd: Array<any> = [];
  data: Array<any> = [];
  remind: Array<any> = [];
  addEditTitle: string = '添加';
  role_id: string;
  editId: number;
  flag: boolean = true;
  userEditFlag: boolean = false;

  deleteBtn: boolean = false;
  deleteAllBtn: boolean = false;
  addBtn: boolean = false;
  editBtn: boolean = false;
  setOperate: boolean = true;
  paginationBtn: boolean = true;
  searchBtn: boolean = true;
  setBtn: boolean = true;

  tableView: boolean = true;
  addView: boolean = false;

  pagination: paginationObj = new paginationObj();
  url: string = '/api/admin/admins/index';
  params:params=new params();

  add(id: number) {
    for (let i = 0; i < this.headers.length; i++) {
        this.headers[i].show = true;
        this.headers[i].required = true;
    }
    if (id >= 0) {
      for (let i = 0; i < this.headers.length; i++) {
          this.headers[i].required = false;
      }
      this.flag = false;
      this.addEditTitle = '编辑';
      this.editId = id;
      this.headerAdd = this.headers.map(d => {
        switch (d.input_type) {
          case INPUTTYPE.INPUT:
            d.val = this.data[id][d.key];
            break;
          case INPUTTYPE.REMINDINPUT:
            d.val = this.data[id][d.key];
            break;
          case INPUTTYPE.SELECT:
            let val = this.data[id][d.key];
            d.val = d.select_val[val];
            break;
          default:
            d.val = this.data[id][d.key];
        }

        return d;
      });
    } else {
      this.flag = true;
      this.addEditTitle = '添加';
      this.headerAdd = this.headers.map(d => {
        d.val = '';
        return d;
      });
    }
    this.addView = true;
    this.tableView = false;

  }

  submit(submitData) {
    this.remind.map( k =>{
          if(k.name == submitData['role_name']){
                  this.role_id = k.id;
          }
    });
    if (this.flag) {
        //添加
        if (this.role_id!=''&&this.role_id!=undefined) {
            this.http.adminsAdd(this.role_id, submitData.user_name, submitData.name, submitData.password).then(data => {
                if (data['status'] == 'ok') {
                    this.data = data['data'];
                  this.params['page']='1';
                  this.getHeartData(this.url, this.params);
                    for (let i = 0; i < this.headers.length; i++) {
                        if (this.headers[i].key == 'password_confirmation' || this.headers[i].key == 'password' || this.headers[i].key == 'name') {
                            this.headers[i].show = false;
                            this.headers[i].required = false;
                        }
                    }
                    this.addView = false;
                    this.tableView = true;
                } else {
                    const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
                    this.toastService.toast(toastCfg);
                }
            }).catch(err => {
                const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
                this.toastService.toast(toastCfg);
            });
        }else{
            const toastCfg = new ToastConfig(ToastType.ERROR, '', '管理员角色不存在！建议从下拉框中选择。', 3000);
            this.toastService.toast(toastCfg);
        }
    } else {
        //编辑
        if(this.userEditFlag){
            //模糊搜索框被编辑
            if (this.role_id!=''&&this.role_id!=undefined) {
                this.http.adminsUpdate('' + this.data[this.editId]['id'], this.role_id, submitData.user_name, submitData.name, submitData.password).then(data => {
                    if (data['status'] == 'ok') {
                        this.data = data['data'];
                      this.params['page']='1';
                      this.getHeartData(this.url, this.params);
                        this.role_id = '';
                        for (let i = 0; i < this.headers.length; i++) {
                            if (this.headers[i].key == 'password_confirmation' || this.headers[i].key == 'password' || this.headers[i].key == 'name') {
                                this.headers[i].show = false;
                                this.headers[i].required = false;
                            }
                        }
                        this.addView = false;
                        this.tableView = true;
                        this.userEditFlag = false;
                    } else {
                        const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
                        this.toastService.toast(toastCfg);
                    }
                }).catch(err => {
                    const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
                    this.toastService.toast(toastCfg);
                });
            }else{
                const toastCfg = new ToastConfig(ToastType.ERROR, '', '管理员角色不存在！', 3000);
                this.toastService.toast(toastCfg);
            }
        }else{
            this.http.remindUpdate('' + this.data[this.editId]['id'], submitData.user_name, submitData.name, submitData.password).then(data => {
                // console.log(data);
                if (data['status'] == 'ok') {
                    this.data = data['data'];
                  this.params['page']='1';
                  this.getHeartData(this.url, this.params);
                    for (let i = 0; i < this.headers.length; i++) {
                        if (this.headers[i].key == 'password_confirmation' || this.headers[i].key == 'password' || this.headers[i].key == 'name') {
                            this.headers[i].show = false;
                            this.headers[i].required = false;
                        }
                    }
                    this.addView = false;
                    this.tableView = true;
                    this.userEditFlag = false;
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

  }

  sort(sort: sortObj) {
    this.params['sort_key'] = sort.key;
    this.params['sort_val'] = sort.val;
    this.getHeartData(this.url,this.params);
  }

  search(searchObj: searchObj) {
    this.params['find_key']=searchObj.selectValue;
    this.params['find_val']=searchObj.searchValue;
    this.params['page']='1';
    this.getHeartData(this.url,this.params);
  }

  paginationChange(params) {
    this.params['page']=params['page'];
    this.params['count'] =params['per_page'];
    this.getHeartData(this.url,this.params);
  }

  getHeartData(url,params){
    this.http.getTableData(url,params).then(data => {


        if (data['status'] == 'ok') {
        this.data = data['data'];
        this.pagination =data['pagination'];
      } else {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', data['message'], 3000);
        this.toastService.toast(toastCfg);
      }
    }).catch(err => {
      const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
      this.toastService.toast(toastCfg);
    });
  }

  set (set: string) {

      this.http.setHeader('admins', set).then(v => v).then(w => {
      this.headers = this.http.getHeader('admins');
    });
  }

  del(id: string) {
    this.http.adminsDel(id).then(data => {
      if (data['status'] == 'ok') {
        this.params['page']='1';
        this.getHeartData(this.url, this.params);
      } else {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
        this.toastService.toast(toastCfg);
      }
    }).catch(err => {
      const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
      this.toastService.toast(toastCfg);
    });
  }

  delAll(arr: Array<any>) {
    if (arr.length) {
      this.http.adminsDel('' + arr[0]).then(data => {
        if (data['status'] == 'ok') {
          arr.splice(0, 1);
          if (arr.length) {
            this.delAll(arr);
          } else {
            this.params['page']='1';
            this.getHeartData(this.url, this.params);
          }
        } else {
          const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
          this.toastService.toast(toastCfg);
          return;
        }
      }).catch(err => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
        this.toastService.toast(toastCfg);
      });
    }
  }

  cancel() {
    for (let i = 0; i < this.headers.length; i++) {
      if (this.headers[i].key == 'password_confirmation' || this.headers[i].key == 'password' || this.headers[i].key == 'name'|| this.headers[i].key == 'role_id') {
        this.headers[i].show = false;
      }
    }
    this.addView = false;
    this.tableView = true;
  }

  getSendRemind(data) {
    this.remind = data.remind;
    this.userEditFlag = data.userEditFlag;
  };
}


