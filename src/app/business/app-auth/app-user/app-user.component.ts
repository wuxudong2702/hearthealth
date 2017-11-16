import {Component, OnInit} from '@angular/core';
import {cell, SortDirection, sortObj, DataType, searchObj, INPUTTYPE} from '../../../shared/table/table-list.component';
import {ApiService} from '../../../business-service/api/api.service';
import 'rxjs/add/operator/toPromise';
import {_switch} from "rxjs/operator/switch";

@Component({
  selector: 'app-app-user',
  templateUrl: './app-user.component.html',
  styleUrls: ['./app-user.component.css'],
  providers: []
})
export class AppUserComponent implements OnInit {

  constructor(private http: ApiService) {
  }

  ngOnInit() {
    this.headers = this.http.getHeader('users');
  }

  headers: Array<cell> = [];
  data: Array<any> = [];

  headerAdd: Array<cell> = [];
  subUsersheaderAdd: Array<cell> = [];

  subUserHeaders: Array<any> = [];
  subUserData: Array<any> = [];
  editId: number;
  addEditTitle: string = '添加';

  appUserDel: boolean = true;//this.http.isHavePerm('app-user-del');
  appUserAdd: boolean = false;//this.http.isHavePerm('app-user-add');
  appUserEdit: boolean = false;//this.http.isHavePerm('app-user-edit');
  deleteBtn: boolean = this.appUserDel;
  deleteAllBtn: boolean = this.appUserDel;
  addBtn: boolean = this.appUserAdd;
  editBtn: boolean = this.appUserEdit;

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

  del(id: number) {
    this.http.postAppUserDel(id).then(data => {
      console.log(data, '删除');
      this.data = data['data'];
    });
  }

  delAll(checkedList: any) {
    this.http.postAppUserDelAll(checkedList).then(data => {
      console.log(data, '删除全部');
      this.data = data['data'];
    });
  }

  sort(sort: sortObj) {
    this.http.postAppUserSort(sort.id, sort.order).then(data => {
      console.log(data, '排序');
      this.data = data['data'];
    });
  }

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

  cancle() {
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
    this.http.postAppUserSubSort(sort.id, sort.order).then(data => {
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

  subUsersCancle() {
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

  set () {

  }
}
