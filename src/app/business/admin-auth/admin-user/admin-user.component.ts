import { Component, OnInit } from '@angular/core';
import {cell, SortDirection, sortObj,DataType} from '../../../shared/table/table-list.component';
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
  data: Array<any> = [];
  addBtn: boolean = true;
  deleteBtn: boolean = true;
  editBtn: boolean = true;
  deleteAllBtn: boolean = true;
  setOperate: boolean = true;
  showZTreeView: boolean = false;
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
  onEdit(id:number) {
    console.log('4213 213er');
    this.http.getZtreeNodes().then(data => {
      this.nodes = data['nodes'];
    });
    this.showZTreeView = !this.showZTreeView;
  }

}
