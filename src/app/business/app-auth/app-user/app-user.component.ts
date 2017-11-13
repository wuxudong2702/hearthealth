import {Component, OnInit} from '@angular/core';
import {cell, SortDirection, sortObj, DataType, INPUTTYPE} from '../../../shared/table/table-list.component';
import {ApiService} from '../../../business-service/api/api.service';
import 'rxjs/add/operator/toPromise';
import {_switch} from "rxjs/operator/switch";

// const headers: Array<cell> = [
//   {
//     key: 'userName',
//     show: true,
//     name: '用户名',
//     index: 4,
//     order: SortDirection.NONE,
//     pipe: {type: DataType.NONE, params: ''},
//   },
//   {
//     key: 'accountType',
//     show: true,
//     name: '账户类型',
//     index: 0,
//     order: SortDirection.NONE,
//     pipe: {type: DataType.ENUM, params: {0: '子账户', 1: '主账户'}},
//   },
//   {
//     key: 'age',
//     show: true,
//     name: '年龄',
//     index: 1,
//     order: SortDirection.NONE,
//     pipe: {type: DataType.NONE, params: ''},
//   },
//   {
//     key: 'sex',
//     show: true,
//     name: '性别',
//     index: 2,
//     order: SortDirection.NONE,
//     pipe: {type: DataType.ENUM, params: {0: '女', 1: '男'}},
//   },
//   {
//     key: 'address',
//     show: true,
//     name: '地区',
//     index: 3,
//     order: SortDirection.NONE,
//     pipe: {type: DataType.NONE, params: ''},
//   },
//   {
//     key: 'telephoneNum',
//     show: true,
//     name: '手机',
//     index: 4,
//     order: SortDirection.NONE,
//     pipe: {type: DataType.NONE, params: ''},
//   },
//   {
//     key: 'height',
//     show: true,
//     name: '身高',
//     index: 5,
//     order: SortDirection.NONE,
//     pipe: {type: DataType.NONE, params: ''},
//   },
//   {
//     key: 'weight',
//     show: true,
//     name: '体重',
//     index: 6,
//     order: SortDirection.NONE,
//     pipe: {type: DataType.NONE, params: ''},
//   },
//   {
//     key: 'subUsersViewNum',
//     show: true,
//     name: '子用户个数',
//     index: 7,
//     order: SortDirection.NONE,
//     pipe: {type: DataType.NONE, params: ''},
//   },
//
// ];
// const data: Array<any> = [//表格內容列表
//   {
//     userName: '张文丽',
//     accountType: 1,
//     age: 12,
//     sex: 0,
//     address: '安徽省',
//     telephoneNum: '18045142702',
//     height:'185',
//     weight:'75',
//     subUsersViewNum:20,
//   },
//   {
//     userName: '张倩倩',
//     accountType: 0,
//     age: 10,
//     sex: 1,
//     address: '北京市海淀区西二旗',
//     telephoneNum: '18045142702',
//     height:'185',
//     weight:'75',
//     subUsersViewNum:20,
//   },
//   {
//     userName: '李四',
//     accountType: 0,
//     age: 22,
//     sex: 0,
//     address: '黑龙江',
//     telephoneNum: '18045142702',
//     height:'185',
//     weight:'75',
//     subUsersViewNum:10,
//   },
//
// ];
//子用户列表。
// const subUserHeaders: Array<cell> = [
//   {
//     key: 'subUserName',
//     show: true,
//     name: '用户名',
//     index: 4,
//     order: SortDirection.NONE,
//     pipe: {type: DataType.NONE, params: ''},
//   },
//   {
//     key: 'relationship',
//     show: true,
//     name: '与主账户关系',
//     index: 0,
//     order: SortDirection.NONE,
//     pipe: {type: DataType.NONE, params: ''},
//   },
//   {
//     key: 'age',
//     show: true,
//     name: '年龄',
//     index: 1,
//     order: SortDirection.NONE,
//     pipe: {type: DataType.NONE, params: ''},
//   },
//   {
//     key: 'sex',
//     show: true,
//     name: '性别',
//     index: 2,
//     order: SortDirection.NONE,
//     pipe: {type: DataType.ENUM, params: {0: '女', 1: '男'}},
//   },
//   {
//     key: 'address',
//     show: true,
//     name: '地区',
//     index: 3,
//     order: SortDirection.NONE,
//     pipe: {type: DataType.NONE, params: ''},
//   },
//   {
//     key: 'telephoneNum',
//     show: true,
//     name: '手机',
//     index: 4,
//     order: SortDirection.NONE,
//     pipe: {type: DataType.NONE, params: ''},
//   },
//   {
//     key: 'height',
//     show: true,
//     name: '身高',
//     index: 5,
//     order: SortDirection.NONE,
//     pipe: {type: DataType.NONE, params: ''},
//   },
//   {
//     key: 'weight',
//     show: true,
//     name: '体重',
//     index: 6,
//     order: SortDirection.NONE,
//     pipe: {type: DataType.NONE, params: ''},
//   },
// ];
// const subUserData:Array<any>=[//表格內容列表
//   {
//     userName: '张文丽',
//     relationship: '父子',
//     age: 12,
//     sex: 0,
//     address: '安徽省',
//     telephoneNum: '18045142702',
//     height:'185',
//     weight:'75',
//   },
//   {
//     userName: '张倩倩',
//     relationship: '父子',
//     age: 10,
//     sex: 1,
//     address: '北京市海淀区西二旗',
//     telephoneNum: '18045142702',
//     height:'185',
//     weight:'75',
//   },
//   {
//     userName: '李四',
//     relationship: '父子',
//     age: 22,
//     sex: 0,
//     address: '黑龙江',
//     telephoneNum: '18045142702',
//     height:'185',
//     weight:'75',
//   },
//
// ];

@Component({
  selector: 'app-app-user',
  templateUrl: './app-user.component.html',
  styleUrls: ['./app-user.component.css'],
  providers: [ApiService]
})
export class AppUserComponent implements OnInit {

  constructor(private http: ApiService) {
  }

  ngOnInit() {
    this.http.getAppUserHeader().then(data => {
      this.headers = data['headers'];
    });
    this.http.getAppUserData().then(data => {
      this.data = data['data'];
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
  addBtn: boolean = true;
  deleteBtn: boolean = true;
  searchBtn: boolean = true;
  detailsBtn: boolean = true;
  deleteAllBtn: boolean = true;
  setBtn: boolean = true;
  editBtn: boolean = true;
  backBtn: boolean = true;
  setOperate: boolean = true;
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
        switch(d.inputType)
        {
          case INPUTTYPE.INPUT:
            d.val = this.data[id][d.key];
            break;
          case INPUTTYPE.SELECT:
            let val = this.data[id][d.key];
            d.val = d.selectVal[val];
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


    this.addSubUserView = false;
    this.addView = false;
    this.subUsersView = false;
    this.tableView = true;
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
        // console.log('______',this.data[id][d.key],d.key);
        console.log('-------', d.inputType);
        switch(d.inputType)
        {
          case INPUTTYPE.INPUT:
            d.val = this.subUserData[id][d.key];
            break;
          case INPUTTYPE.SELECT:
            let val = this.subUserData[id][d.key];
            d.val = d.selectVal[val];
            console.log('----+++++++++---', val, d.selectVal[val]);
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

  subUserSubmit() {


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
}
