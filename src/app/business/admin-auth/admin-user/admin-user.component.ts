import { Component, OnInit } from '@angular/core';
import {cell, SortDirection, sortObj,DataType,INPUTTYPE} from '../../../shared/table/table-list.component';
import {HttpClient} from "@angular/common/http";
import {ApiService} from '../../../business-service/api/api.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css'],
  providers:[ApiService]
})

export class AdminUserComponent implements OnInit {

  constructor(private http: ApiService) {}

  ngOnInit() {
      this.http.getAdminUserData().then(data => {
          this.data = data['data'];
          console.log('233',this.data);
      });
      this.http.getAdminUserHeader().then(data => {
          this.headers = data['headers'];
          console.log('233',this.headers);
      });

  }
  nodes:any;
  headers: Array<cell> = [];
  headerAdd: Array<any> = [];
  data: Array<any> = [];
  addBtn: boolean = true;
  deleteBtn: boolean = true;
  editBtn: boolean = true;
  deleteAllBtn: boolean = true;
  setOperate: boolean = true;
  addEditTitle: string = '添加';
  editId: number;
  tableView: boolean = true;
  addView: boolean = false;

  onDel(id:number){
      this.http.postAdminUserDel(id).then(data=>{
          console.log(data,'删除');
          this.data=data['data'];
      });
  }
  onDelAll(checkedList:any){
      this.http.postAdminUserDelAll(checkedList).then(data=>{
          console.log(data,'删除全部');
          this.data=data['data'];
      });
  }
  onSort(sort: sortObj) {
      this.http.postAdminUserSort(sort.id,sort.order).then(data=>{
          console.log(data,'排序');
          this.data=data['data'];
      });
  }
  add(id: number) {
      if (id >= 0) {
          this.addEditTitle = '编辑';
          this.editId = id;
          this.headerAdd = this.headers.map(d => {
              switch (d.inputType) {
                  case INPUTTYPE.INPUT:
                      d.val = this.data[id][d.key];
                      break;
                  case INPUTTYPE.SELECT:
                      let val = this.data[id][d.key];
                      d.val = d.selectVal[val];
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

  cancle() {
      this.addView = false;
      this.tableView = true;
  }

  submit(submitData: string) {
      this.http.postAdminUserSubmit(submitData).then(data => {
          console.log(data, '提交');
          this.data = data['data'];
      });
      this.addView = false;
      this.tableView = true;
    }

}
