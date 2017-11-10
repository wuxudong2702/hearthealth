import {Component, OnInit} from '@angular/core';
import {cell, SortDirection, sortObj,DataType} from '../../../shared/table/table-list.component';
import {ApiService} from '../../../business-service/api/api.service';
import 'rxjs/add/operator/toPromise';

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
//     key: 'subUsersNum',
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
//     subUsersNum:20,
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
//     subUsersNum:20,
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
//     subUsersNum:10,
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
  providers:[ApiService]
})
export class AppUserComponent implements OnInit {

  constructor(private http: ApiService) {}

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
  subUserHeaders:Array<any>=[];
  subUserData:Array<any>=[];

  addBtn:boolean=true;
  deleteBtn: boolean = true;
  searchBtn: boolean = true;
  detailsBtn: boolean = true;
  deleteAllBtn: boolean = true;
  setBtn: boolean = true;
  editBtn:boolean=true;
  backBtn:boolean=true;
  setOperate: boolean = true;

  // paginationBtn: boolean = true;
  subUsers: boolean = true;
  userName: string = '';
  onDetails(id){
    // this.
    this.subUsers=!this.subUsers;

    // this.detailsBtn=false;
    // this.downloadBtn=true;
    //
    // this.headers=this.subUserHeaders;
    // this.data=this.subUserData;
    this.http.getAppUserSubHeader().then(data => {
        this.subUserHeaders = data['headers'];
    });
    this.http.getAppUserSubData().then(data => {
        this.subUserData = data['data'];
    });
  }
  // onDownload(){
  //   this.showChartView=!this.showChartView;
  // }
  onBack(){
    this.subUsers=!this.subUsers;
  }

  onDel(id:number){
      this.http.postAppUserDel(id).then(data=>{
          console.log(data,'删除');
          this.data=data['data'];
      });
  }
  onDelAll(checkedList:any){
      this.http.postAppUserDelAll(checkedList).then(data=>{
          console.log(data,'删除全部');
          this.data=data['data'];
      });
  }
  onSort(sort: sortObj) {
      this.http.postAppUserSort(sort.id,sort.order).then(data=>{
          console.log(data,'排序');
          this.data=data['data'];
      });
  }

  onSubDel(id:number){
      this.http.postAppUserSubDel(id).then(data=>{
          console.log(data,'删除');
          this.subUserData=data['data'];
      });
  }
  onSubDelAll(checkedList:any){
      this.http.postAppUserSubDelAll(checkedList).then(data=>{
          console.log(data,'删除全部');
          this.subUserData=data['data'];
      });
  }
  onSubSort(sort: sortObj) {
      this.http.postAppUserSubSort(sort.id,sort.order).then(data=>{
          console.log(data,'排序');
          this.subUserData=data['data'];
      });
  }
}
