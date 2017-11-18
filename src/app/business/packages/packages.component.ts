import { Component, OnInit } from '@angular/core';
import {cell, SortDirection, sortObj,DataType,INPUTTYPE} from '../../shared/table/table-list.component';
import {ApiService} from '../../business-service/api/api.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css'],
  providers:[]
})
export class PackagesComponent implements OnInit {

    constructor(private http: ApiService) {}

    ngOnInit() {
            this.headers =this.http.getHeader('app-upgrades');
        this.http.getPackagesData().then(data => {
            this.data = data['data'];
        });
    }

  headers: Array<cell> = [];
  data: Array<any> = [];
  headerAdd: Array<cell> = [];
  editId: number;
  addEditTitle: string = '添加';
  addView: boolean = false;
  tableView: boolean = true;

  PDel: boolean = false;//this.http.isHavePerm('app-upgrade-del');
  PAdd: boolean = false;//this.http.isHavePerm('app-upgrade-add');
  PEdit: boolean = false;//this.http.isHavePerm('app-upgrade-edit');
  deleteBtn: boolean = this.PDel;
  deleteAllBtn: boolean = this.PDel;
  addBtn: boolean = this.PAdd;
  editBtn: boolean = this.PEdit;

  setOperate: boolean = true;
  paginationBtn: boolean = true;

  del(id:number){
      this.http.postPackagesDel(id).then(data=>{
          this.data=data['data'];
      });
  }

  delAll(checkedList:any){
      this.http.postPackagesDelAll(checkedList).then(data=>{
          this.data=data['data'];
      });
  }

  sort(sort: sortObj) {
      this.http.postPackagesSort(sort.key,sort.val).then(data=>{
          this.data=data['data'];
      });
  }

  add(id: number) {
      if (id >= 0) {
          this.addEditTitle = '编辑';
          this.editId = id;
          this.headerAdd = this.headers.map(d => {
              switch(d.input_type)
              {
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
      }
      else {
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
      this.http.postPackagesSubmit(submitData).then(data => {
          this.data = data['data'];
      });
      this.addView = false;
      this.tableView = true;
  }
}
