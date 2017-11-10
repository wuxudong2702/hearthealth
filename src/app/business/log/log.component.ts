import { Component, OnInit } from '@angular/core';
import {cell, SortDirection, sortObj,DataType} from '../../shared/table/table-list.component';

// const headers: Array<cell> = [
//   {
//     key: 'userName',
//     show: true,
//     name: '用户名',
//     index: 0,
//     order: SortDirection.NONE,
//     pipe: {type: DataType.NONE, params: ''},
//   },
//   {
//     key: 'operate',
//     show: true,
//     name: '操作',
//     index: 1,
//     order: SortDirection.NONE,
//     pipe: {type: DataType.NONE, params: ''},
//   },
//   {
//     key: 'operateTime',
//     show: true,
//     name: '时间',
//     index: 2,
//     order: SortDirection.NONE,
//     pipe: {type: DataType.DATATIME, params: 'yyyyMMdd'},
//   }
// ];
const data: Array<any> = [
    {
        userName: 'user1',
        operate: '修改用户名',
        operateTime: '2017-10-1 10:20:00',
    },
    {
        userName: 'user2',
        operate: '添加用户',
        operateTime: '2017-10-1 10:20:00',
    },
    {
        userName: 'user3',
        operate: '解绑设备',
        operateTime: '2017-10-1 10:20:00',
    },

];

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  // setOperate
  headers: Array<cell> = [];
  data: Array<any> = data;
  searchBtn: boolean = true;
  paginationBtn: boolean = true;
  setOperate: boolean = false;
  onSort(sort:sortObj){
    let id=sort.id;
    let order=sort.order;

  }
}
