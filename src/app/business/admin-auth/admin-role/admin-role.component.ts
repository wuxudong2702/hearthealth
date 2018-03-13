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
import {ApiService} from '../../../business-service/api/api.service';
import 'rxjs/add/operator/toPromise';
import {ToastService} from '../../../shared/toast/toast.service';
import {ToastConfig, ToastType} from '../../../shared/toast/toast-model';
import {ModalService} from '../../../shared/modal/modal.service';
import {ConfirmConfig} from '../../../shared/modal/modal-model';

@Component({
  selector: 'app-admin-role',
  templateUrl: './admin-role.component.html',
  styleUrls: ['./admin-role.component.css'],
  providers: []
})
export class AdminRoleComponent implements OnInit {

  constructor(private http: ApiService, private modalService: ModalService, private toastService: ToastService) {
  }

  ngOnInit() {
    if(this.http.hasToken()){
      this.headers = this.http.getHeader('roles');
      this.params['page']='1';
      this.getHeartData(this.url,this.params);
        this.http.isHavePerm('admin-role-del').then(v => {
            this.deleteBtn = v;
            this.deleteAllBtn = v;
        });
        this.http.isHavePerm('admin-role-edit').then(v => {
            this.editZTreeBtn = v;
        });
        this.http.isHavePerm('admin-role-add').then(v => {
            this.addBtn = v;
        });
        this.getNodes();
    }
  }

  nodes: any;
  updateNodes: any;
  headers: Array<cell> = [];
  data: Array<any> = [];
  permsArrayUpdate: Array<any> = [];
  permsArrayAdd: Array<any> = [];
  headerAdd: Array<cell> = [];

  deleteBtn: boolean = false;
  deleteAllBtn: boolean = false;
  addBtn: boolean = false;
  editZTreeBtn: boolean = false;
  paginationBtn: boolean = true;
  searchBtn: boolean = true;
  setBtn: boolean = true;
  isShow: boolean = true;
  isShowTittle: boolean = true;
  treeAdd: boolean = true;

  setOperate: boolean = true;
  editId: string;
  addEditTitle: string = '';
  tableView: boolean = true;
  addView: boolean = false;
  addTreeView: boolean = false;
  editTreeView: boolean = false;
  flag: boolean = false;
  treeEditFlag: boolean = false;//编辑时是否操作树

  pagination: paginationObj = new paginationObj();

  url: string = '/api/admin/admins/role/index';
  params:params=new params();
  permsAdd: string;
  permsUpdate: string;
  name: string;
  description: string;
  id: string;
  submitData: string;


  getNodes() {
    this.http.getZtreeNodes().then(data => {
      this.nodes = data['nodes'];
    });
  }

  add() {
    this.addEditTitle = '添加';
    this.flag = true;
    this.headerAdd = this.headers.map(d => {
      d.val = '';
      return d;
    });
    this.http.getZtreeNodes().then(data => {
      this.nodes = data['nodes'];
    });
    this.permsAdd = 'hearthealth,ecgd-data-show,ecgd-chart-show,ecgd-del,ecgd-download,hhr-show,hhr-del,heart-dev-show,heart-dev-add,heart-dev-edit,heart-dev-del,info-show,info-add,info-edit,info-del,app-upgrade-show,app-upgrade-add,app-upgrade-edit,app-upgrade-del,app-auth-show,app-user-show,app-user-add,app-user-edit,app-user-del,app-role-show,app-role-edit,admin-show,admin-user-show,admin-user-add,admin-user-edit,admin-user-del,admin-role-show,admin-role-add,admin-role-edit,admin-role-del,log';
    this.isShow = false;
    this.isShowTittle = false;
    this.addView = true;
    this.addTreeView = true;
    this.editTreeView = false;
    this.tableView = false;
    this.treeEditFlag=false;

  }

  del(id) {
    this.http.rolesDel(id).then(data => {
      if (data['status'] == 'ok') {
        this.params['page']='1';
        this.getHeartData(this.url,this.params);
      } else {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
        this.toastService.toast(toastCfg);
      }
    }).catch(err => {
      const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
      this.toastService.toast(toastCfg);
    });
  }

  edit(id) {
    this.id = this.data[id]['id'];
    // console.log(this.id, '编辑的id');
    // console.log(this.data[id], '编辑的数据');
    this.isShow = false;
    this.isShowTittle = true;
    this.flag = false;
    this.addEditTitle = '编辑';
    this.updateNodes =[];
    this.headerAdd = this.headers.map(d => {
      switch (d.input_type) {
        case INPUTTYPE.INPUT:
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
    this.http.rolesPerms(this.id).then(data => {
      if (data['status'] == 'ok') {
        this.updateNodes = data['data'];
        this.addView = true;
        this.tableView = false;
        this.addTreeView = false;
        this.editTreeView = true;
        this.treeEditFlag=false;

      } else {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
        this.toastService.toast(toastCfg);
      }
    }).catch(err => {
      const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
      this.toastService.toast(toastCfg);
    });
  }

  addSubmit(CheckedNodes: any) {
    this.permsArrayAdd = CheckedNodes['CheckedNodes'].map(v => {
      return v.key;
    });
    this.permsAdd = this.permsArrayAdd.join(',');
  }

  editSubmit(CheckedNodes: any) {
    this.treeEditFlag=true;
    this.permsArrayUpdate = CheckedNodes['CheckedNodes'].map(v => {
      return v.id;
    });
    this.permsUpdate = this.permsArrayUpdate.join(',');
  }

  submit(submiData) {
      if (this.flag) {
          //添加
          if (this.permsAdd) {
              console.log('submiData',submiData);
              this.http.rolesAdd(submiData.name, submiData.description, this.permsAdd).then(data => {
                  if (data['status'] == 'ok') {
                    this.data = data['data'];
                    this.params['page']='1';
                    this.getHeartData(this.url,this.params);
                    this.tableView = true;
                    this.addView = false;
                    this.addTreeView = false;
                    this.editTreeView = false;
                  } else {
                    const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
                    this.toastService.toast(toastCfg);
                  }
              }).catch(err => {
                const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
                this.toastService.toast(toastCfg);
              });
          } else {
            const toastCfg = new ToastConfig(ToastType.ERROR, '', '请选择权限', 3000);
            this.toastService.toast(toastCfg);
          }
      } else {
          //编辑
          // console.log(this.permsUpdate, 'this.permsUpdate');
          if(submiData.description==undefined){
             submiData.description='';
          }
          if (this.permsUpdate) {
              this.http.rolesUpdate(this.id, submiData.description, submiData.name, this.permsUpdate).then(data => {
                  if (data['status'] == 'ok') {
                    this.data = data['data'];
                    this.permsUpdate='';
                    this.params['page']='1';
                    this.getHeartData(this.url,this.params);
                    this.addView = false;
                    this.addTreeView = false;
                    this.editTreeView = false;
                    this.tableView = true;
                    this.treeEditFlag=false;
                  } else {
                    const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
                    this.toastService.toast(toastCfg);
                  }
              }).catch(err => {
                const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
                this.toastService.toast(toastCfg);
              });
          }else {
              if(this.treeEditFlag==false){
                  this.http.rolesUpdateTreeEdit(this.id, submiData.description, submiData.name).then(data => {
                      if (data['status'] == 'ok') {
                        this.data = data['data'];
                        this.params['page']='1';
                        this.getHeartData(this.url,this.params);
                        this.addView = false;
                        this.addTreeView = false;
                        this.editTreeView = false;
                        this.tableView = true;
                        this.treeEditFlag=false;
                      } else {
                        const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
                        this.toastService.toast(toastCfg);
                      }
                  }).catch(err => {
                    const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
                    this.toastService.toast(toastCfg);
                  });
            }else {
              const toastCfg = new ToastConfig(ToastType.ERROR, '', '请选择权限', 3000);
              this.toastService.toast(toastCfg);
            }
          }
      }
  }


  delAll(arr: Array<any>) {
    if (arr.length) {
      this.http.rolesDel('' + arr[0]).then(data => {
        if (data['status'] == 'ok') {
          arr.splice(0, 1);
          if (arr.length) {
            this.delAll(arr);
          } else {
            this.params['page']='1';
            this.getHeartData(this.url,this.params);
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
    this.addView = false;
    this.addTreeView = false;
    this.editTreeView = false;
    this.tableView = true;
    this.treeEditFlag=false;
  }

  sendFormValue(formValue) {
    this.name = formValue.name;
    this.description = formValue.description;
  }

  sort(sort: sortObj) {
    this.params['sort_key'] = sort.key;
    this.params['sort_val'] = sort.val;
    this.getHeartData(this.url,this.params);
  }

  set (set: string) {
    this.http.setHeader('roles', set).then(v => v).then(w => {
      this.headers = this.http.getHeader('roles');
    });
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
}
