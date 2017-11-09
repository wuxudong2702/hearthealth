import { Component, OnInit } from '@angular/core';
import {cell, SortDirection, sortObj,DataType} from '../../../shared/table/table-list.component';
import {HttpClient} from "@angular/common/http";
// const headers: Array<cell> = [
//   {
//     key: 'administratorPermissions',
//     show: true,
//     name: '管理员角色',
//     index: 1,
//     order: SortDirection.NONE,
//     pipe: {type: DataType.NONE, params: ''},
//   },
//   {
//     key: 'Permissions',
//     show: true,
//     name: '管理员权限',
//     index: 0,
//     order: SortDirection.NONE,
//     pipe: {type: DataType.NONE, params: ''},
//   },
//
// ];
// const data: Array<any> = [//表格內容列表
//   {
//     administratorPermissions: '李四',
//     Permissions: '管理员',
//   },
//   {
//     administratorPermissions: '张三',
//     Permissions: '平台管理员',
//   },
//   {
//     administratorPermissions: '王小二',
//     Permissions: '超级管理员',
//   },
//   {
//     administratorPermissions: '王二',
//     Permissions: '管理员',
//   },
// ];

@Component({
  selector: 'app-admin-role',
  templateUrl: './admin-role.component.html',
  styleUrls: ['./admin-role.component.css']
})
export class AdminRoleComponent implements OnInit {

  constructor(private http: HttpClient) {
      this.http.get("assets/hearthealthData/admin-role-data.json")
          .subscribe(
              (data) =>{
                  this.headersList = data['headers'];
                  this.dataList = data['data'];
                  // console.log( 'headersList:',this.headersList);
                  // console.log( 'data:',this.dataList);
                  this.headers = this.headersList;
                  this.data = this.dataList;
              },
              err => {
                  console.log('Something went wrong!');
              }
          )
  }

  ngOnInit() {}

  headers: Array<cell> = [];
  data: Array<any> =[];
  headersList: Array<cell>;
  dataList: Array<any>;
  addBtn: boolean = true;
  deleteBtn: boolean = true;
  editBtn: boolean = true;
  deleteAllBtn: boolean = true;
  setOperate: boolean = true;
  showZTreeView: boolean = false;

  onEdit(id:number) {
      this.showZTreeView = !this.showZTreeView;
  }
  onSort(id:number){

  }

}
