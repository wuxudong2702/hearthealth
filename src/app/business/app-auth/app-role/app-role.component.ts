import { Component, OnInit } from '@angular/core';
import {cell, SortDirection, DataType} from '../../../shared/table/table-list.component';

const headers: Array<cell> = [
  {
    key: 'appRole',
    show: true,
    name: '账户角色',
    index: 0,
    order: SortDirection.NONE,
    pipe: {type: DataType.ENUM, params: {0:'子账户',1:'主账户'}},
  },
  {
    key: 'subUsersMaxNum',
    show: true,
    name: '最大子用户个数',
    index: 1,
    order: SortDirection.NONE,
    pipe: {type: DataType.NONE, params: ''},
  },

];
const data: Array<any> = [//表格內容列表
  {
    subUsersMaxNum: 12,
    appRole: 1,
    type:1,
  },
  {
    subUsersMaxNum: 2,
    appRole: 1,
  },
  {
    subUsersMaxNum: 9,
    appRole: 1,
  },
  {
    subUsersMaxNum: 9,
    appRole: 1,
  },
  {
    subUsersMaxNum: 19,
    appRole: 1,
  },
  {
    subUsersMaxNum: 9,
    appRole: 1,
  },
  {
    subUsersMaxNum: 20,
    appRole: 1,
  },
];

@Component({
  selector: 'app-app-role',
  templateUrl: './app-role.component.html',
  styleUrls: ['./app-role.component.css']
})
export class AppRoleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  headers: Array<cell> = headers;
  data: Array<any> = data;
  addBtn: boolean = true;
  deleteBtn: boolean = true;
  editBtn: boolean = true;
  deleteAllBtn: boolean = true;
  setOperate: boolean = true;
}
