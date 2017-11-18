import { Component, OnInit } from '@angular/core';
import {cell, SortDirection, sortObj,DataType,INPUTTYPE} from '../../../shared/table/table-list.component';
import {ApiService} from '../../../business-service/api/api.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-admin-role',
  templateUrl: './admin-role.component.html',
  styleUrls: ['./admin-role.component.css'],
  providers:[]
})
export class AdminRoleComponent implements OnInit {

  constructor(private http: ApiService) {}

  ngOnInit() {
    this.headers= this.http.getHeader('roles');
  }

  nodes:any;
  headers: Array<cell> = [];
  data: Array<any> =[];
  headerAdd: Array<cell> = [];

  adminRoleDel: boolean = false;//this.http.isHavePerm('admin-role-del');
  adminRoleAdd: boolean = false;// this.http.isHavePerm('admin-role-add');
  adminRoleEdit: boolean =  false;//this.http.isHavePerm('admin-role-edit');
  deleteBtn: boolean = this.adminRoleDel;
  deleteAllBtn: boolean = this.adminRoleDel;
  addBtn: boolean = this.adminRoleAdd;
  editZTreeBtn: boolean = this.adminRoleEdit;

  setOperate: boolean = true;
  editId: number;
  addEditTitle: string = '添加';
  tableView: boolean = true;
  addView: boolean = false;
  editView: boolean = false;

  editZTree(id:number) {
    this.http.getZtreeNodes().then(data => {
       this.nodes = data['nodes'];
       console.log(this.nodes);
       this.addView = false;
       this.tableView = false;
       this.editView=true;
    });

  }
  add(id: number) {
      this.addEditTitle = '添加';
      this.headerAdd = this.headers.map(d => {
          d.val = '';
          return d;
      });
      this.addView = true;
      this.editView=false;
      this.tableView = false;
  }
  del(id:number){
    console.log('0000000000000000000000');
      this.http.postAdminRoleDel(id).then(data=>{
          console.log(data,'删除');
          this.data=data['data'];
      });
  }
  delAll(checkedList:any){
     this.http.postAdminRoleDelAll(checkedList).then(data=>{
         console.log(data,'删除全部');
         this.data=data['data'];
     });
  }
  sort(sort: sortObj) {
     this.http.postAdminRoleSort(sort.key,sort.val).then(data=>{
         console.log(data,'排序');
         this.data=data['data'];
     });
  }

  cancel() {
     this.addView = false;
     this.editView=false;
     this.tableView = true;
  }

  submit(submitData: string) {
     this.http.postAdminRoleSubmit(submitData).then(data => {
         console.log(data, '提交');
         this.data = data['data'];
         this.addView = false;
         this.editView=false;
         this.tableView = true;
     });
  }

  back(){
     this.tableView = true;
     this.editView=false;
     this.addView=false;
  }

  zTreeSubmit(CheckedNodes:any){
     console.log('选择的数据：',CheckedNodes);
     this.tableView = true;
     this.addView=false;
     this.editView=false;
  }
}
