import { Component, OnInit } from '@angular/core';
import {cell, SortDirection, sortObj,DataType,INPUTTYPE} from '../../../shared/table/table-list.component';
import {HttpClient} from "@angular/common/http";
import {ApiService} from '../../../business-service/api/api.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css'],
  providers:[]
})

export class AdminUserComponent implements OnInit {

  constructor(private http: ApiService) {}

  ngOnInit() {
    this.headers= this.http.getHeader('admins');

  }
  nodes:any;
  headers: Array<cell> = [];
  headerAdd: Array<any> = [];
  data: Array<any> = [];
  addEditTitle: string = '添加';
  editId: number;

  adminUserDel: boolean =false;// this.http.isHavePerm('admin-user-del');
  adminUserAdd: boolean = false;//this.http.isHavePerm('admin-user-add');
  adminUserEdit: boolean = false;//this.http.isHavePerm('admin-user-edit');
  deleteBtn: boolean = this.adminUserDel;
  deleteAllBtn: boolean = this.adminUserDel;
  addBtn: boolean = this.adminUserAdd;
  editBtn: boolean = this.adminUserEdit;
  setOperate: boolean = true;

  tableView: boolean = true;
  addView: boolean = false;

  onDel(id:number){
      this.http.postAdminUserDel(id).then(data=>{
          this.data=data['data'];
      });
  }

  onDelAll(checkedList:any){
      this.http.postAdminUserDelAll(checkedList).then(data=>{
          this.data=data['data'];
      });
  }

  onSort(sort: sortObj) {
      this.http.postAdminUserSort(sort.key,sort.val).then(data=>{
          this.data=data['data'];
      });
  }

  add(id: number) {
      if (id >= 0) {
          this.addEditTitle = '编辑';
          this.editId = id;
          this.headerAdd = this.headers.map(d => {
              switch (d.input_type) {
                  case INPUTTYPE.INPUT:
                      d.val = this.data[id][d.key];
                      break;
                  case INPUTTYPE.SELECT:
                      let val = this.data[id][d.key];
                      d.val = d.select_val[val];
                      break;
                  default:
                      d.val = this.data[id][d.key];
              }
              return d;
          });
      } else {
          this.addEditTitle = '添加';
          this.headerAdd = this.headers.map(d => {
              d.val = '';
              return d;
          });
      }
      this.addView = true;
      this.tableView = false;

  }

  cancel() {
      this.addView = false;
      this.tableView = true;
  }

  submit(submitData: string) {
      this.http.postAdminUserSubmit(submitData).then(data => {
          this.data = data['data'];
      });
      this.addView = false;
      this.tableView = true;
    }

}


