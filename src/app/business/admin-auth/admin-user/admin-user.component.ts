import { Component, OnInit } from '@angular/core';
import {cell, SortDirection, sortObj,DataType} from '../../../shared/table/table-list.component';
import {HttpClient} from "@angular/common/http";

// const headers: Array<cell> = [
//   {
//     key: 'administrator',
//     show: true,
//     name: '管理员姓名',
//     index: 4,
//     order: SortDirection.NONE,
//     pipe: {type: DataType.NONE, params: ''},
//   },
//   {
//     key: 'character',
//     show: true,
//     name: '角色',
//     index: 3,
//     order: SortDirection.NONE,
//     pipe: {type: DataType.NONE, params: ''},
//   },
//
// ];
// const data: Array<any> = [//表格內容列表
//   {
//     administrator: '张文丽',
//     character: '超级管理员',
//
//   },
//   {
//     administrator: '伍子胥',
//     character: '管理员',
//
//   },
//   {
//     administrator: '李文龙',
//     character: '超级管理员',
//
//   },
//   {
//     administrator: '李四',
//     character: '管理员',
//
//   },
//   {
//     administrator: '张三',
//     character: '平台管理员',
//
//   },
//   {
//     administrator: '王小二',
//     character: '超级管理员',
//
//   },
//   {
//     administrator: '王二',
//     character: '管理员',
//
//   },
//
// ];
@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
      this.http.get("assets/hearthealthData/admin-user-data.json")
          .subscribe(
              (data) =>{
                  this.headersList = data['headers'];
                  this.dataList = data['data'];
                  this.headers = this.headersList;
                  this.data = this.dataList;
                  console.log( 'headersList:',this.headers);
                  console.log( 'data:',this.data);
              },
              err => {
                  console.log('Something went wrong!');
              }
          )
  }

  headers: Array<cell> = [];
  data: Array<any> = [];
  headersList: Array<cell>;
  dataList: Array<any>;
  addBtn: boolean = true;
  deleteBtn: boolean = true;
  editBtn: boolean = true;
  deleteAllBtn: boolean = true;
  setOperate: boolean = true;

  onSort(sort:sortObj){
    let id=sort.id;
    let order=sort.order;

  }
}
