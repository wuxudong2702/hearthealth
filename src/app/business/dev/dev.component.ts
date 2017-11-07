import { Component, OnInit } from '@angular/core';
import {cell, SortDirection, DataType} from '../../shared/table/table-list.component';

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
    key: 'accountBind',
    show: true,
    name: '绑定账户',
    index: 3,
    order: SortDirection.NONE,
    pipe: {type: DataType.NONE, params: ''},
  },


  {
    key: 'isBinding',
    show: true,
    name: '是否绑定',
    index: 2,
    order: SortDirection.NONE,
    pipe: {type: DataType.ENUM, params: {0:'是',1:'否'}},
  },
  {
    key: 'devNumber',
    show: true,
    name: '设备号',
    index: 0,
    order: SortDirection.NONE,
    pipe: {type: DataType.NONE, params: ''},
  },
  {
    key: 'devType',
    show: true,
    name: '设备类型',
    index: 1,
    order: SortDirection.NONE,
    pipe: {type: DataType.ENUM, params: {0:'卡片式',1:'佩戴市'}},
  },
];
const data: Array<any> = [//表格內容列表
  {
    userName: '张文丽',
    accountBind: '小名',
    isBinding: 1,
    heartDataLength:2,
    devNumber:'123456789',
    devType:0,
    sex: 0,
    age: 23,
  },
  {
    userName: '伍子胥',
    accountBind: '小名',
    isBinding: 1,
    heartDataLength:2,
    devNumber:'123456789',
    devType:0,
    sex: 1,
    age: 23,
  },
  {
    userName: '李文龙',
    accountBind: '小名',
    isBinding: 1,
    heartDataLength:2,
    devNumber:'45675789',
    devType:1,
    sex: 0,
    age: 23,
  },
  {
    userName: 'user1',
    accountBind: '小名',
    isBinding: 1,
    heartDataLength:2,
    devNumber:'123456789',
    devType:0,
    sex: 0,
    age: 23,
  },
  {
    userName: 'user1',
    accountBind: '明明',
    isBinding: 0,
    heartDataLength:2,
    devNumber:'12353',
    devType:1,
    sex: 1,
    age: 12,
  },
  {
    userName: 'user1',
    accountBind: '小名',
    isBinding: 1,
    heartDataLength:2,
    devNumber:'123456789',
    devType:0,
    sex: 0,
    age: 23,
  },
  {
    userName: 'user1',
    accountBind: '小花',
    isBinding: 0,
    heartDataLength:2,
    devNumber:'123456789',
    devType:1,
    sex: 0,
    age: 28,
  },

];

@Component({
  selector: 'app-dev',
  templateUrl: './dev.component.html',
  styleUrls: ['./dev.component.css']
})
export class DevComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  headers: Array<cell> = headers;
  data: Array<any> = data;
  addBtn:boolean = true;
  deleteBtn: boolean = true;
  searchBtn: boolean = true;
  editBtn: boolean = true;
  deleteAllBtn: boolean = true;
  setBtn: boolean = true;
  paginationBtn: boolean = true;

}
