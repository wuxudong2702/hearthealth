import {Component, OnInit} from '@angular/core';
import {cell, SortDirection, DataType} from '../../../shared/table/table-list.component';

const headers: Array<cell> = [
  {
    key: 'userName',
    show: true,
    name: '用户名',
    index: 4,
    order: SortDirection.NONE,
    pipe: {type: DataType.NONE, params: ''},
  },
  {
    key: 'accountType',
    show: true,
    name: '账户类型',
    index: 0,
    order: SortDirection.NONE,
    pipe: {type: DataType.ENUM, params: {0: '子账户', 1: '主账户'}},
  },
  {
    key: 'age',
    show: true,
    name: '年龄',
    index: 1,
    order: SortDirection.NONE,
    pipe: {type: DataType.NONE, params: ''},
  },
  {
    key: 'sex',
    show: true,
    name: '性别',
    index: 2,
    order: SortDirection.NONE,
    pipe: {type: DataType.ENUM, params: {0: '女', 1: '男'}},
  },
  {
    key: 'address',
    show: true,
    name: '地区',
    index: 3,
    order: SortDirection.NONE,
    pipe: {type: DataType.NONE, params: ''},
  },
  {
    key: 'telephoneNum',
    show: true,
    name: '手机',
    index: 4,
    order: SortDirection.NONE,
    pipe: {type: DataType.NONE, params: ''},
  },
  {
    key: 'height',
    show: true,
    name: '身高',
    index: 5,
    order: SortDirection.NONE,
    pipe: {type: DataType.NONE, params: ''},
  },
  {
    key: 'weight',
    show: true,
    name: '体重',
    index: 6,
    order: SortDirection.NONE,
    pipe: {type: DataType.NONE, params: ''},
  },
  {
    key: 'subUsersNum',
    show: true,
    name: '子用户个数',
    index: 7,
    order: SortDirection.NONE,
    pipe: {type: DataType.NONE, params: ''},
  },

];
const data: Array<any> = [//表格內容列表
  {
    userName: '张文丽',
    accountType: 1,
    age: 12,
    sex: 0,
    address: '安徽省',
    telephoneNum: '18045142702',
    height:'185',
    weight:'75',
    subUsersNum:20,
  },
  {
    userName: '张倩倩',
    accountType: 0,
    age: 10,
    sex: 1,
    address: '北京市海淀区西二旗',
    telephoneNum: '18045142702',
    height:'185',
    weight:'75',
    subUsersNum:20,
  },
  {
    userName: '李四',
    accountType: 0,
    age: 22,
    sex: 0,
    address: '黑龙江',
    telephoneNum: '18045142702',
    height:'185',
    weight:'75',
    subUsersNum:10,
  },

];


@Component({
  selector: 'app-app-user',
  templateUrl: './app-user.component.html',
  styleUrls: ['./app-user.component.css']
})
export class AppUserComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  headers: Array<cell> = headers;
  data: Array<any> = data;
  addBtn:boolean=true;
  deleteBtn: boolean = true;
  downloadBtn: boolean = true;
  searchBtn: boolean = true;
  detailsBtn: boolean = true;
  deleteAllBtn: boolean = true;
  setBtn: boolean = true;
  chartBtn: boolean = true;
  paginationBtn: boolean = true;

  showChartView: boolean = false;
  userName: string = '';
}
