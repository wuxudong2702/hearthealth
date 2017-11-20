import { Component, OnInit } from '@angular/core';
import {cell, SortDirection, sortObj,DataType,INPUTTYPE,searchObj,paginationObj} from '../../../shared/table/table-list.component';
import {ApiService} from '../../../business-service/api/api.service';
import 'rxjs/add/operator/toPromise';
import {ToastService} from '../../../shared/toast/toast.service';
import {ToastConfig, ToastType} from '../../../shared/toast/toast-model';
import {ModalService} from '../../../shared/modal/modal.service';
import {ConfirmConfig} from '../../../shared/modal/modal-model';

@Component({
  selector: 'app-admin-role',
  templateUrl: './admin-role.component.html',
  styleUrls: ['./admin-role.component.css'],
  providers:[]
})
export class AdminRoleComponent implements OnInit {

  constructor(private http: ApiService,private modalService: ModalService,private toastService: ToastService) {}

  ngOnInit() {
      this.headers= this.http.getHeader('roles');

      this.getHeartData(this.url);
      console.log(this.headers, this.data);
      this.http.isHavePerm('admin-role-del').then(v => {
          this.deleteBtn = v;
          this.deleteAllBtn = v;
      });
      this.http.isHavePerm('admin-role-edit').then(v => {
          this.editZTreeBtn = v;
      });
      this.http.isHavePerm('admin-role-add').then(v => {
          this.addBtn = v;
      });
     //  this.http.getAdminRoleHeader().then(data => {
     //      this.headers = data['headers'];
     //  });
     //  this.http.getAdminRoleData().then(data => {
     //      this.data = data['data'];
     //  });
  }

  nodes:any;
  headers: Array<cell> = [];
  data: Array<any> =[];
  headerAdd: Array<cell> = [];

  // adminRoleDel: boolean = false;//this.http.isHavePerm('admin-role-del');
  // adminRoleAdd: boolean = false;// this.http.isHavePerm('admin-role-add');
  // adminRoleEdit: boolean =  false;//this.http.isHavePerm('admin-role-edit');
  // deleteBtn: boolean = this.adminRoleDel;
  // deleteAllBtn: boolean = this.adminRoleDel;
  // addBtn: boolean = this.adminRoleAdd;
  // editZTreeBtn: boolean = this.adminRoleEdit;
  deleteBtn: boolean = false;
  deleteAllBtn: boolean = false;
  addBtn: boolean = false;
  editZTreeBtn: boolean = false;
  paginationBtn: boolean = true;
  searchBtn: boolean = true;
  setBtn: boolean = true;

  setOperate: boolean = true;
  editId: number;
  addEditTitle: string = '';
  tableView: boolean = true;
  addView: boolean = false;
  editView: boolean = false;

  pagination: paginationObj = new paginationObj();
  per_page: string=null;
  find_key: string=null;
  find_val: string=null;
  sort_key: string=null;
  sort_val: string=null;
  url: string = '';

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

  cancel() {
     this.addView = false;
     this.editView=false;
     this.tableView = true;
  }

  submit(submitData: string) {
     this.http.postAdminRoleSubmit(submitData).then(data => {
         console.log(data, '提交');
         console.log(submitData, '喵');
         this.data = data['data'];

         let confirmCfg = new ConfirmConfig('是否配置权限？');
         let result = this.modalService.confirm(confirmCfg);
         result.then(v => {
             // this.editZTree(submitData.id);
         }).catch(v => {

         });

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

  getHeartData(url: string = this.url, per_page: string = this.per_page, find_key: string = this.find_key, find_val: string = this.find_val, sort_key: string = this.sort_key, sort_val: string = this.sort_val) {
        this.http.getData(url, per_page, find_key, find_val, sort_key, sort_val).then(data => {
            if (data['status'] == 'ok') {
                this.data = data['data']['data'];
                this.pagination.current_page = data['data']['current_page'];
                this.pagination.last_page = data['data']['last_page'];
                this.pagination.per_page = data['data']['per_page'];
                this.pagination.total = data['data']['total'];
                this.pagination.first_page_url = data['data']['first_page_url'];
                this.pagination.last_page_url = data['data']['last_page_url'];
                this.pagination.next_page_url = data['data']['next_page_url'];
                this.pagination.prev_page_url = data['data']['prev_page_url'];
                this.pagination.to = data['data']['to'];
                // console.log(this.pagination,'pagination======');
            } else {
                const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
                this.toastService.toast(toastCfg);
            }
        }).catch(err => {
            const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
            this.toastService.toast(toastCfg);
        });
  }

  paginationChange(parmas) {
        this.per_page = parmas['per_page'];
        if(parmas['url']!=undefined){
            this.url = parmas['url'];
        }
        this.getHeartData( this.url, this.per_page, this.find_key, this.find_val, this.sort_key, this.sort_val);
  }

  sort(sort: sortObj) {
      this.sort_key = sort.key;
      this.sort_val = sort.val;
      this.getHeartData(this.url, this.per_page, this.find_key, this.find_val, this.sort_key, this.sort_val);
  }

  set (set: string) {
      this.http.setHeader('roles', set).then(v => v).then(w => {
          this.headers = this.http.getHeader('roles');
      });
  }

  search(searchObj: searchObj) {
      this.find_val = searchObj.searchValue;
      this.find_key = searchObj.selectValue;
      this.getHeartData(this.url, this.per_page, this.find_key, this.find_val, this.sort_key, this.sort_val);
  }
}
