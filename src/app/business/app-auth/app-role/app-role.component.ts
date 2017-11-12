import { Component, OnInit } from '@angular/core';
import {cell, SortDirection, sortObj,DataType} from '../../../shared/table/table-list.component';
import {ApiService} from '../../../business-service/api/api.service';
import 'rxjs/add/operator/toPromise';

// const headers: Array<cell> = [
//   {
//     key: 'appRole',
//     show: true,
//     name: '账户角色',
//     index: 0,
//     order: SortDirection.NONE,
//     pipe: {type: DataType.ENUM, params: {0:'子账户',1:'主账户'}},
//   },
//   {
//     key: 'subUsersMaxNum',
//     show: true,
//     name: '最大子用户个数',
//     index: 1,
//     order: SortDirection.NONE,
//     pipe: {type: DataType.NONE, params: ''},
//   },
//
// ];
// const data: Array<any> = [//表格內容列表
//   {
//     subUsersMaxNum: 12,
//     appRole: 1,
//     type:1,
//   },
//   {
//     subUsersMaxNum: 2,
//     appRole: 1,
//   },
//   {
//     subUsersMaxNum: 9,
//     appRole: 1,
//   },
//   {
//     subUsersMaxNum: 9,
//     appRole: 1,
//   },
//   {
//     subUsersMaxNum: 19,
//     appRole: 1,
//   },
//   {
//     subUsersMaxNum: 9,
//     appRole: 1,
//   },
//   {
//     subUsersMaxNum: 20,
//     appRole: 1,
//   },
// ];

@Component({
  selector: 'app-app-role',
  templateUrl: './app-role.component.html',
  styleUrls: ['./app-role.component.css'],
  providers: [ApiService]

})
export class AppRoleComponent implements OnInit {

    constructor(private http: ApiService) {}

    ngOnInit() {
        this.http.getAppRoleHeader().then(data => {
            this.headers = data['headers'];
        });
        this.http.getAppRoleData().then(data => {
            this.data = data['data'];
        });
    }

  headers: Array<cell> = [];
  headerAdd:Array<cell>=[];
  headerEdit:Array<cell>=[];

  data: Array<any> = [];

  editId: number;

  addBtn: boolean = true;
  deleteBtn: boolean = true;
  editBtn: boolean = true;
  deleteAllBtn: boolean = true;
  setOperate: boolean = true;

  addView:boolean=false;
  editView:boolean=false;
  tableView:boolean=true;

    del(id:number){
        this.http.postAppRoleDel(id).then(data=>{
            console.log(data,'删除');
            this.data=data['data'];
        });
    }
    delAll(checkedList:any){
        this.http.postAppRoleDelAll(checkedList).then(data=>{
            console.log(data,'删除全部');
            this.data=data['data'];
        });
    }
    sort(sort: sortObj) {
        this.http.postAppRoleSort(sort.id,sort.order).then(data=>{
            console.log(data,'排序');
            this.data=data['data'];
        });
    }
  add(){
    this.addView=true;
    this.editView=false;
    this.tableView=false;
    this.headerAdd=this.headers;
  }

  edit(id:number){
    this.editId=id;
    this.addView=false;
    this.editView=true;
    this.tableView=false;
    this.headerEdit=this.headers;

  }

  onBack(){
    this.addView=false;
    this.editView=false;
    this.tableView=true;
  }
  cancle(){
    this.addView=false;
    this.editView=false;
    this.tableView=true;
  }


  Submit(submitData:string){


    this.addView=false;
    this.editView=false;
    this.tableView=true;
  }
}
