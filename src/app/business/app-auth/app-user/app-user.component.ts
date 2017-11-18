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
    this.headers = this.http.getHeader('heart-data');
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

  headers: Array<cell> = [];
  data: Array<any> = [];

  headerAdd: Array<cell> = [];
  subUsersheaderAdd: Array<cell> = [];

  subUserHeaders: Array<any> = [];
  subUserData: Array<any> = [];
  editId: number;
  addEditTitle: string = '添加';

  // appUserDel: boolean = true;//this.http.isHavePerm('app-user-del');
  // appUserAdd: boolean = false;//this.http.isHavePerm('app-user-add');
  // appUserEdit: boolean = false;//this.http.isHavePerm('app-user-edit');
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
  url: string = '/api/admin/heart/index';


  add(id: number) {
    if (id >= 0) {
      this.addEditTitle = '编辑';
      this.editId = id;
      this.headerAdd = this.headers.map(d => {
        // console.log('______',this.data[id][d.key],d.key);
        // console.log('-------', d.inputType);
        switch (d.input_type) {
          case INPUTTYPE.INPUT:
            d.val = this.data[id][d.key];
            break;
          case INPUTTYPE.SELECT:
            let val = this.data[id][d.key];
            d.val = d.select_val[val];
            // console.log('----+++++++++---', val, d.selectVal[val]);
            break;
          default:
            d.val = this.data[id][d.key];
        }

        return d;
      });
    }
    else {
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
    this.addView = false;
    this.subUsersView = false;
    this.tableView = true;
    this.addSubUserView = false;

  }

  submit(submitData: string) {

    this.http.postAppUserSubmit(submitData).then(data => {
      console.log(data, '提交');
      this.data = data['data'];
    });
    this.addSubUserView = false;
    this.addView = false;
    this.subUsersView = false;
    this.tableView = true;
  }

  Search(searchObj: searchObj) {
    console.log('app-user searchObj:', searchObj);
    // this.selectValue = searchObj.selectValue;
    // this.searchValue = searchObj.searchValue;
    this.http.postAppUserSearch(searchObj.selectValue, searchObj.searchValue).then(data => {
      console.log('app-user Search result:', data);
      this.data = data['data'];
    });
  }

  details(id: number) {
    this.addView = false;
    this.subUsersView = true;
    this.tableView = false;
    this.addSubUserView = false;
    // this.headerAdd=this.headers;
    this.http.getAppUserSubHeader().then(data => {
      console.log('appuser getAppUserSubHeaders header', data);
      this.subUserHeaders = data['headers'];
    });
    this.http.getAppUserSubData().then(data => {
      this.subUserData = data['data'];

    });
  }

  subUsersDel(id: number) {
    this.http.postAppUserSubDel(id).then(data => {
      console.log(data, '删除');
      this.subUserData = data['data'];
    });
  }

  subUsersDelAll(checkedList: any) {
    this.http.postAppUserSubDelAll(checkedList).then(data => {
      console.log(data, '删除全部');
      this.subUserData = data['data'];
    });
  }

  subUsersSort(sort: sortObj) {
    this.http.postAppUserSubSort(sort.key, sort.val).then(data => {
      console.log(data, '排序');
      this.subUserData = data['data'];
    });
  }

  subUsersAdd(id: number) {
    if (id >= 0) {
      this.addEditTitle = '编辑';
      this.editId = id;
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

        return d;
      });
    }
    else {
      this.addEditTitle = '添加';
      this.subUsersheaderAdd = this.subUserHeaders.map(d => {
        d.val = '';
        return d;
      });

    }
    this.addView = false;
    this.subUsersView = false;
    this.tableView = false;
    this.addSubUserView = true;
  }

  subUsersback() {
    this.addView = false;
    this.subUsersView = false;
    this.tableView = true;
    this.addSubUserView = false;
    this.addEditTitle = '添加';

  }

  subUserSubmit(submitData: string) {
    this.http.postAppUserSubSubmit(submitData).then(data => {
      console.log(data, '提交');
      this.data = data['data'];
    });
    this.addView = false;
    this.subUsersView = true;
    this.tableView = false;
    this.addSubUserView = false;
  }

  subUsersCancel() {
    this.addView = false;
    this.subUsersView = true;
    this.tableView = false;
    this.addSubUserView = false;
  }

  subUserSearch(searchObj: searchObj) {
    console.log('app-user-sub searchObj:', searchObj);
    // this.selectValue = searchObj.selectValue;
    // this.searchValue = searchObj.searchValue;
    this.http.postAppUserSubSearch(searchObj.selectValue, searchObj.searchValue).then(data => {
      console.log('app-user-sub Search result:', data);
      this.data = data['data'];
    });
  }

  sort(sort: sortObj) {
    this.sort_key = sort.key;
    this.sort_val = sort.val;
    this.getHeartData(this.url, this.per_page, this.find_key, this.find_val, this.sort_key, this.sort_val);
  }

  del(ids: string) {
    this.http.ecgdDelData(ids).then(data => {
      if (data['status'] == 'ok') {
        this.getHeartData();
      } else {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
        this.toastService.toast(toastCfg);
      }
    }).catch(err => {
      const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
      this.toastService.toast(toastCfg);
    });
  }

  search(searchObj: searchObj) {
    this.find_val = searchObj.searchValue;
    this.find_key = searchObj.selectValue;
    this.getHeartData(this.url, this.per_page, this.find_key, this.find_val, this.sort_key, this.sort_val);
  }

  paginationChange(parmas) {
    this.per_page = parmas['per_page'];
    this.url = parmas['url'];
    this.getHeartData(this.url, this.per_page, this.find_key, this.find_val, this.sort_key, this.sort_val);
//     this.http.getEcgdData(parmas['url'],parmas['per_page']).then(data => {
//       if (data['status'] == 'ok') {
//   this.data = data['data']['data'];
//   this.pagination.current_page=data['data']['current_page'];
//   this.pagination.last_page=data['data']['last_page'];
//   this.pagination.per_page=data['data']['per_page'];
//   this.pagination.total=data['data']['total'];
//   this.pagination.first_page_url=data['data']['first_page_url'];
//   this.pagination.last_page_url=data['data']['last_page_url'];
//   this.pagination.next_page_url=data['data']['next_page_url'];
//   this.pagination.prev_page_url=data['data']['prev_page_url'];
//   this.pagination.to=data['data']['to'];
// } else {
//   const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
//   this.toastService.toast(toastCfg);
// }
// }).catch(err => {
//   const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
//   console.error(err);
//   this.toastService.toast(toastCfg);
// });
  }

  set (set: string) {
    this.http.setHeader('heart-data', set).then(v => v).then(w => {
      this.headers = this.http.getHeader('heart-data');
      console.log(this.headers, '------0-0-0-');
    });
  }

  getHeartData(url: string = this.url, per_page: string = this.per_page, find_key: string = this.find_key, find_val: string = this.find_val, sort_key: string = this.sort_key, sort_val: string = this.sort_val) {
    this.http.getData(url, per_page, find_key, find_val, sort_key, sort_val).then(data => {
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
        // console.log(this.pagination,'pagination======');
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
