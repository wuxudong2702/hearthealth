import {Component, OnInit} from '@angular/core';
import {
  cell,
  SortDirection,
  sortObj,
  DataType,
  INPUTTYPE,
  searchObj,
  paginationObj
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
        this.getHeartData(this.url);
        console.log(this.headers, this.data);
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
  per_page: string = null;
  find_key: string = null;
  find_val: string = null;
  sort_key: string = null;
  sort_val: string = null;
  url: string = '/api/admin/admins/role/index';
  permsAdd: string;
  permsUpdate: string;
  name: string;
  description: string;
  id: string;
  submitData: string;

  getNodes() {
    this.http.getZtreeNodes().then(data => {
      this.nodes = data['nodes'];
      // this.updateNodes = data['nodes'];
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
        this.getHeartData(this.url, this.per_page,'1', this.find_key, this.find_val, this.sort_key, this.sort_val);
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
          // console.log(this.permsAdd, 'this.permsAdd');
          if (this.permsAdd) {
              this.http.rolesAdd(submiData.name, submiData.description, this.permsAdd).then(data => {
                  if (data['status'] == 'ok') {
                    this.data = data['data'];
                    this.getHeartData(this.url, this.per_page, '1', this.find_key, this.find_val, this.sort_key, this.sort_val);
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
                    this.getHeartData(this.url, this.per_page, '1', this.find_key, this.find_val, this.sort_key, this.sort_val);
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
                        this.getHeartData(this.url, this.per_page, '1', this.find_key, this.find_val, this.sort_key, this.sort_val);
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

  getHeartData(url: string = this.url, per_page: string = this.per_page, page:string = '1', find_key: string = this.find_key, find_val: string = this.find_val, sort_key: string = this.sort_key, sort_val: string = this.sort_val) {
    this.http.getData(url, per_page, page, find_key, find_val, sort_key, sort_val).then(data => {
      if (data['status'] == 'ok') {
        console.log(data['data']['data'], '111111');
        this.data = data['data']['data'];
        this.pagination.current_page = data['data']['current_page'];
        this.pagination.last_page = data['data']['last_page'];
        this.pagination.per_page = data['data']['per_page'];
        this.pagination.total = data['data']['total'];
        this.pagination.first_page_url = data['data']['first_page_url'];
        this.pagination.last_page_url = data['data']['last_page_url'];
        this.pagination.next_page_url = data['data']['next_page_url'];
        this.pagination.prev_page_url = data['data']['prev_page_url'];
        this.pagination.to = data['data']['to'];
      } else {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
        this.toastService.toast(toastCfg);
      }
    }).catch(err => {
      const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
      this.toastService.toast(toastCfg);
    });
  }

  paginationChange(parmas) {
    this.per_page = parmas['per_page'];
    console.log(this.url);
    this.getHeartData(this.url, this.per_page, parmas['page'], this.find_key, this.find_val, this.sort_key, this.sort_val);
  }

  sort(sort: sortObj) {
    this.sort_key = sort.key;
    this.sort_val = sort.val;
    this.getHeartData(this.url, this.per_page, '1', this.find_key, this.find_val, this.sort_key, this.sort_val);
  }

  set (set: string) {
    this.http.setHeader('roles', set).then(v => v).then(w => {
      this.headers = this.http.getHeader('roles');
    });
  }

  search(searchObj: searchObj) {
    this.find_val = searchObj.searchValue;
    this.find_key = searchObj.selectValue;
    this.getHeartData(this.url, this.per_page, '1', this.find_key, this.find_val, this.sort_key, this.sort_val);
  }

  delAll(arr: Array<any>) {
    if (arr.length) {
      this.http.rolesDel('' + arr[0]).then(data => {
        if (data['status'] == 'ok') {
          arr.splice(0, 1);
          if (arr.length) {
            this.delAll(arr);
          } else {
            this.getHeartData(this.url, this.per_page, '1', this.find_key, this.find_val, this.sort_key, this.sort_val);
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
}
