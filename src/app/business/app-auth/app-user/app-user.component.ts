import {Component, OnInit} from '@angular/core';
import {
  cell,
  SortDirection,
  sortObj,
  DataType,
  searchObj,
  INPUTTYPE,
  paginationObj

} from '../../../shared/table/table-list.component';
import {ApiService} from '../../../business-service/api/api.service';
import 'rxjs/add/operator/toPromise';
import {_switch} from "rxjs/operator/switch";
import {ToastService} from '../../../shared/toast/toast.service';
import {ToastConfig, ToastType} from '../../../shared/toast/toast-model';


@Component({
  selector: 'app-app-user',
  templateUrl: './app-user.component.html',
  styleUrls: ['./app-user.component.css'],
  providers: []
})
export class AppUserComponent implements OnInit {

  constructor(private http: ApiService, private toastService: ToastService) {
  }

  ngOnInit() {
    if(this.http.hasToken()){
        this.headers = this.http.getHeader('users');
        this.getHeartData(this.url);
        this.http.isHavePerm('app-user-del').then(v => {
            this.deleteBtn = v;
            this.deleteAllBtn = v;
        });
        this.http.isHavePerm('app-user-add').then(v => {
            this.addBtn = v;
        });
        this.http.isHavePerm('app-user-edit').then(v => {
            this.editBtn = v;
        });
    }
  }

  headers: Array<cell> = [];
  data: Array<any> = [];
  headerAdd: Array<cell> = [];

  subUserHeaders: Array<any> = [];
  subUserData: Array<any> = [];
  subUsersheaderAdd: Array<cell> = [];

  addEditTitle: string = '添加';
  deleteBtn: boolean = false;
  deleteAllBtn: boolean = false;
  addBtn: boolean = false;
  editBtn: boolean = false;
  searchBtn: boolean = true;
  detailsBtn: boolean = true;
  setBtn: boolean = true;
  backBtn: boolean = true;
  setOperate: boolean = true;
  paginationBtn: boolean = true;
  userName: string = '';

  addView: boolean = false;
  tableView: boolean = true;
  addSubUserView: boolean = false;
  subUsersView: boolean = false;

  pagination: paginationObj = new paginationObj();
  per_page: string = null;
  find_key: string = null;
  find_val: string = null;
  sort_key: string = null;
  sort_val: string = null;
  url: string = '/api/admin/app/user/index';

  sub_pagination: paginationObj = new paginationObj();
  sub_per_page: string = null;
  sub_find_key: string = null;
  sub_find_val: string = null;
  sub_sort_key: string = null;
  sub_sort_val: string = null;
  sub_url: string = '/api/admin/app/user/index';

  id: number = 0;
  addEditFlag: boolean = true;
  parentSubFlag: boolean = true;
  flag: boolean = true;
  parent_id: string = '';
  editId: string;
  subEditId: string;

  add(id: number) {
    for (let i = 0; i < this.headers.length; i++) {
      if (this.headers[i].key == 'password_confirmation' || this.headers[i].key == 'password' || this.headers[i].key == 'mobile'|| this.headers[i].key == 'relationship') {
        this.headers[i].show = true;
        if (id == undefined ) {
          this.headers[i].required = true;
        } else {
          this.headers[i].required = false;
        }
      }
    }
    if (id >= 0) {
      this.addEditFlag = false;
      this.addEditTitle = '编辑';
      this.editId = '' + this.data[id].id;
      this.headerAdd = this.headers.map(d => {
        switch (d.input_type) {
          case INPUTTYPE.INPUT:
            d.val = this.data[id][d.key];
            break;
          case INPUTTYPE.SELECT:
            let val = this.data[id][d.key];
            d.val = d.pipe_params[val];
            break;
          default:
            d.val = this.data[id][d.key];
        }
        return d;
      });
    }
    else {
      this.addEditFlag = true;
      this.addEditTitle = '添加';
      this.headerAdd = this.headers.map(d => {
        d.val = '';
        return d;
      });
    }
    this.addView = true;
    this.subUsersView = false;
    this.tableView = false;
    this.addSubUserView = false;
  }

  cancel() {
    for (let i = 0; i < this.headers.length; i++) {
      if (this.headers[i].key == 'password_confirmation' || this.headers[i].key == 'password') {
        this.headers[i].show = false;
      }
    }
    this.addView = false;
    this.subUsersView = false;
    this.tableView = true;
    this.addSubUserView = false;
    this.addEditFlag = true;
    this.parentSubFlag = true;
  }


  submit(submitData) {

    if (this.addEditFlag) {
      //添加
      let role = this.parentSubFlag ? '0' : '1';
      this.http.userAdd(this.parent_id, submitData, '0').then(data => {
        if (data['status'] == 'ok') {
          this.data = data['data'];
          this.getHeartData(this.url, this.per_page, '1', this.find_key, this.find_val, this.sort_key, this.sort_val);
          this.tableView = true;
          this.addSubUserView = false;
          this.addView = false;
          this.subUsersView = false;
          for (let i = 0; i < this.headers.length; i++) {
            if (this.headers[i].key == 'password_confirmation' || this.headers[i].key == 'password') {
              this.headers[i].show = false;
            }
          }
        } else {
          const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
          this.toastService.toast(toastCfg);
        }
      }).catch(err => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
        this.toastService.toast(toastCfg);
      });
    } else {
      //编辑提交
      let role = this.parentSubFlag ? '0' : '1';
      this.http.userUpdate(this.editId, this.parent_id, submitData, '0').then(data => {
        if (data['status'] == 'ok') {
          this.data = data['data'];
          this.getHeartData(this.url, this.per_page, '1', this.find_key, this.find_val, this.sort_key, this.sort_val);
          this.tableView = true;
          this.addSubUserView = false;
          this.addView = false;
          this.subUsersView = false;
          for (let i = 0; i < this.headers.length; i++) {
            if (this.headers[i].key == 'password_confirmation' || this.headers[i].key == 'password') {
              this.headers[i].required = false;
              this.headers[i].show = false;
            }
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

  sort(sort: sortObj) {
    this.sort_key = sort.key;
    this.sort_val = sort.val;
    this.getHeartData(this.url, this.per_page, '1', this.find_key, this.find_val, this.sort_key, this.sort_val);
  }

  del(ids: string) {
    this.http.userDelData(ids).then(data => {
      if (data['status'] == 'ok') {
        this.getHeartData(this.url, this.per_page, '1', this.find_key, this.find_val, this.sort_key, this.sort_val);
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
      this.http.userDelData('' + arr[0]).then(data => {
        if (data['status'] == 'ok') {
          arr.splice(0, 1);
          if (arr.length) {
            this.delAll(arr);
          } else {
            if (this.parentSubFlag) {
              this.getHeartData(this.url, this.per_page, '1', this.find_key, this.find_val, this.sort_key, this.sort_val);
            } else {
              this.getSubHeartData(this.sub_url, this.parent_id, this.sub_per_page, this.sub_find_key, this.sub_find_val, this.sub_sort_key, this.sub_sort_val);
            }
            return;
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

  search(searchObj: searchObj) {
    this.find_val = searchObj.searchValue;
    this.find_key = searchObj.selectValue;
    this.getHeartData(this.pagination.first_page_url, this.per_page, this.find_key, this.find_val, this.sort_key, this.sort_val);
  }

  paginationChange(parmas) {
    this.per_page = parmas['per_page'];
    if (parmas['url'] != undefined) {
      this.url = parmas['url'];
    }
    this.getHeartData(this.url, this.per_page, '1', this.find_key, this.find_val, this.sort_key, this.sort_val);
  }

  set (set: string) {
    this.http.setHeader('users', set).then(v => v).then(w => {
      this.headers = this.http.getHeader('users');
    });
  }

  getHeartData(url: string = this.url, per_page: string = this.per_page, page:string = '1', find_key: string = this.find_key, find_val: string = this.find_val, sort_key: string = this.sort_key, sort_val: string = this.sort_val) {
    this.http.getData(url, per_page, page, find_key, find_val, sort_key, sort_val).then(data => {
      if (data['status'] == 'ok') {
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


  details(id: number) {
    this.parentSubFlag = false;
    this.parent_id = '' + this.data[id].id;
    this.addView = false;
    this.subUsersView = true;
    this.tableView = false;
    this.addSubUserView = false;

    if (this.flag) {
      this.flag = false;
      this.subUserHeaders =  this.http.getHeader('subUsers');
    //   for (let i = 0; i < this.headers.length; i++) {
    //     if (this.headers[i].key == 'zone' ||this.headers[i].key == 'relationship' || this.headers[i].key == 'sex' || this.headers[i].key == 'name' || this.headers[i].key == 'birth'   || this.headers[i].key == 'height' || this.headers[i].key == 'weight') {
    //       this.subUserHeaders.push(this.headers[i]);
    //     }
    //   }
    }
    this.getSubHeartData(this.sub_url, this.parent_id, this.sub_per_page, this.sub_find_key, this.sub_find_val, this.sub_sort_key, this.sub_sort_val);
  }


  subUsersDel(ids: string) {
    this.http.userDelData(ids).then(data => {
      if (data['status'] == 'ok') {
        this.getSubHeartData(this.sub_url, this.parent_id);
      } else {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
        this.toastService.toast(toastCfg);
      }
    }).catch(err => {
      const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
      this.toastService.toast(toastCfg);
    });
  }

  subUsersSort(sort: sortObj) {
    this.sub_sort_key = sort.key;
    this.sub_sort_val = sort.val;
    this.getSubHeartData(this.sub_url, this.parent_id, this.sub_per_page, this.sub_find_key, this.sub_find_val, this.sub_sort_key, this.sub_sort_val);
  }

  subUsersAdd(id: number) {
    if (id >= 0) {
      this.addEditFlag = false;
      this.addEditTitle = '编辑';
      this.subEditId = '' + this.subUserData[id].id;
      this.subUsersheaderAdd = this.subUserHeaders.map(d => {
        switch (d.input_type) {
          case INPUTTYPE.INPUT:
            d.val = this.subUserData[id][d.key];
            break;
          case INPUTTYPE.SELECT:
            let val = this.subUserData[id][d.key];
            d.val = d.select_val[val];
            break;
          default:
            d.val = this.subUserData[id][d.key];
        }
        if(d['key']=='name'){
          d['required']=false;
        }
        return d;
      });
    }
    else {
      this.addEditFlag = true;
      this.addEditTitle = '添加';
      this.subUsersheaderAdd = this.subUserHeaders.map(d => {
        d.val = '';
        if(d['key']=='name'){
          d['required']=true;
        }
        return d;
      });
    }
    this.addView = false;
    this.subUsersView = false;
    this.tableView = false;
    this.addSubUserView = true;
  }

  subUsersback() {

    this.getHeartData(this.url, this.per_page, '1', this.find_key, this.find_val, this.sort_key, this.sort_val);
    this.addView = false;
    this.subUsersView = false;
    this.tableView = true;
    this.addSubUserView = false;
    this.addEditTitle = '添加';
    this.addEditFlag = true;
    this.parentSubFlag = true;
    this.parent_id = '';

  }


  subUserSubmit(submitData) {
    if (this.addEditFlag) {//addEditFlag=true的时候是添加
      this.http.userAdd(this.parent_id, submitData, '1').then(data => {
        if (data['status'] == 'ok') {
          this.data = data['data'];
          this.getSubHeartData(this.sub_url, this.parent_id, this.sub_per_page, this.sub_find_key, this.sub_find_val, this.sub_sort_key, this.sub_sort_val);
          this.tableView = false;
          this.addSubUserView = false;
          this.addView = false;
          this.subUsersView = true;
        } else {
          const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
          this.toastService.toast(toastCfg);
        }
      }).catch(err => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
        this.toastService.toast(toastCfg);
      });
    } else {//编辑提交
      let role = this.parentSubFlag ? '0' : '1';
      this.http.userUpdate(this.subEditId, this.parent_id, submitData, '1').then(data => {
        if (data['status'] == 'ok') {
          this.data = data['data'];
          this.getSubHeartData(this.sub_url, this.parent_id, this.sub_per_page, this.sub_find_key, this.sub_find_val, this.sub_sort_key, this.sub_sort_val);
          this.tableView = false;
          this.addSubUserView = false;
          this.addView = false;
          this.subUsersView = true;
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

  subUsersCancel() {

    this.addView = false;
    this.subUsersView = true;
    this.tableView = false;
    this.addSubUserView = false;
  }

  subUserSearch(searchObj: searchObj) {
    this.sub_find_val = searchObj.searchValue;
    this.sub_find_key = searchObj.selectValue;
    this.getSubHeartData(
      this.sub_url,
      this.parent_id,
      this.sub_per_page,
      this.sub_find_key,
      this.sub_find_val,
      this.sub_sort_key,
      this.sub_sort_val);
  }

  getSubHeartData(sub_url: string = this.sub_url,
                  parent_id: string = this.parent_id,
                  sub_per_page: string = this.sub_per_page,
                  sub_find_key: string = this.sub_find_key,
                  sub_find_val: string = this.sub_find_val,
                  sub_sort_key: string = this.sub_sort_key,
                  sub_sort_val: string = this.sub_sort_val) {
    this.http.getSUbUserData(sub_url, parent_id, sub_per_page, sub_find_key, sub_find_val, sub_sort_key, sub_sort_val).then(data => {
      if (data['status'] == 'ok') {
        this.subUserData = data['data']['data'];
        this.sub_pagination.current_page = data['data']['current_page'];
        this.sub_pagination.last_page = data['data']['last_page'];
        this.sub_pagination.per_page = data['data']['per_page'];
        this.sub_pagination.total = data['data']['total'];
        this.sub_pagination.first_page_url = data['data']['first_page_url'];
        this.sub_pagination.last_page_url = data['data']['last_page_url'];
        this.sub_pagination.next_page_url = data['data']['next_page_url'];
        this.sub_pagination.prev_page_url = data['data']['prev_page_url'];
        this.sub_pagination.to = data['data']['to'];
      } else {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
        this.toastService.toast(toastCfg);
      }
    }).catch(err => {
      const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
      this.toastService.toast(toastCfg);
    });
  }


  sub_paginationChange(parmas) {
    this.sub_per_page = parmas['per_page'];
    if (parmas['url'] != undefined) {
      this.sub_url = parmas['url'];
    }
    this.getSubHeartData(this.sub_url, this.parent_id, this.sub_per_page, this.sub_find_key, this.sub_find_val, this.sub_sort_key, this.sub_sort_val);
  }

  sub_set(set: string) {
    this.http.setHeader('subUsers', set).then(v => v).then(w => {
      this.subUserHeaders = this.http.getHeader('subUsers');
    });
  }

}
