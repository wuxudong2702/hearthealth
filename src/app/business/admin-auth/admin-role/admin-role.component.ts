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
      this.getNodes();
     //  this.http.getAdminRoleHeader().then(data => {
     //      this.headers = data['headers'];
     //  });
     //  this.http.getAdminRoleData().then(data => {
     //      this.data = data['data'];
     //  });
  }

  nodes:any;
  nodesUpdate:any;
  headers: Array<cell> = [];
  data: Array<any> =[];
  permsArray: Array<any> =[];
  headerAdd: Array<cell> = [];

  deleteBtn: boolean = false;
  deleteAllBtn: boolean = false;
  addBtn: boolean = false;
  editZTreeBtn: boolean = false;
  paginationBtn: boolean = true;
  searchBtn: boolean = true;
  setBtn: boolean = true;
  isShow: boolean = true;

  setOperate: boolean = true;
  editId: string;
  addEditTitle: string = '';
  tableView: boolean = true;
  addView: boolean = false;
  editView: boolean = false;
  updateView: boolean = false;
  flag: boolean = false;

  pagination: paginationObj = new paginationObj();
  per_page: string=null;
  find_key: string=null;
  find_val: string=null;
  sort_key: string=null;
  sort_val: string=null;
  url: string = '/api/admin/admins/role/index';
  perms: string;
  name: string;
  description: string;
  id: string;
  submitData: string;

  editZTree(id) {

      this.id = this.data[id]['id'];
      console.log(this.id,'编辑的id');
      this.isShow = false;
      this.flag=false;
      this.addEditTitle = '编辑';
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
      console.log('this.perms',this.perms);
      this.http.rolesPerms(this.data[id]['id']).then(data => {
          if (data['status'] == 'ok') {
              console.log(data,'获取编辑树');
              this.nodes = data['data'];
              this.nodesUpdate = data['data'];
              this.addView = true;
              this.tableView = false;
              this.updateView=true;
              console.log(this.nodesUpdate,'this.nodesUpdate');

          } else {
              const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
              this.toastService.toast(toastCfg);
          }
      }).catch(err => {
          const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
          this.toastService.toast(toastCfg);
      });


  }
  getNodes() {
    this.http.getZtreeNodes().then(data => {
       this.nodes = data['nodes'];
       this.nodesUpdate = data['nodes'];
    });
  }
  add() {
      this.addEditTitle = '添加';
      this.flag = true;
      this.headerAdd = this.headers.map(d => {
          d.val = '';
          return d;
      });
      this.getNodes();
      console.log(this.nodes,'-------默认全选');
      this.isShow = false;
      this.addView = true;
      this.editView=true;
      this.updateView=false;
      this.tableView = false;
  }
  del(id){
      this.http.rolesDel(id).then(data => {
          if (data['status'] == 'ok') {
              this.getHeartData();
          } else {
              const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
              this.toastService.toast(toastCfg);
          }
      }).catch(err => {
          const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
          this.toastService.toast(toastCfg);
      });
  }
  delAll(checkedList:any){

  }
  cancel() {
     this.addView = false;
     this.editView=false;
     this.tableView = true;
  }
  back(){
     this.tableView = true;
     this.editView=false;
     this.updateView=false;
     this.addView=false;
  }
  zTreeSubmit(CheckedNodes:any){
      console.log('CheckedNodes',CheckedNodes);
      this.permsArray = CheckedNodes['CheckedNodes'].map(v =>{
            return v.key;
      });
      this.perms = this.permsArray.join(',');
      console.log('------------------this.perms',this.perms);

      this.http.rolesAdd(this.name,this.description,this.perms).then(data => {
              if (data['status'] == 'ok') {
                  this.data = data['data'];
                  this.getHeartData();

              } else {
                  const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
                  this.toastService.toast(toastCfg);
              }
          }).catch(err => {
              const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
              this.toastService.toast(toastCfg);
          });

     this.tableView = true;
     this.addView=false;
     this.editView=false;
     this.updateView=false;
  }
  zTreeUpdate(CheckedNodes:any){
     console.log('--编辑--');
      this.permsArray = CheckedNodes['CheckedNodes'].map(v =>{
          return v.key;
      });
      this.perms = this.permsArray.join(',');
      this.http.rolesUpdate(this.id,this.description,this.name,this.perms).then(data => {
          if (data['status'] == 'ok') {
              this.data = data['data'];
              this.getHeartData();
              this.addView = false;
              this.editView=false;
              this.updateView=false;
              this.tableView = true;
          } else {
              const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
              this.toastService.toast(toastCfg);
          }
      }).catch(err => {
          const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
          this.toastService.toast(toastCfg);
      });
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

    sendFormValue(formValue){
      this.name = formValue.name;
      this.description = formValue.description;
    }
}
