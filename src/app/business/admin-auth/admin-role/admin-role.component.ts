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

    nodes: any;
    updateNodes: any;
    headers: Array<cell> = [];
    data: Array<any> =[];
    permsArrayUpdate: Array<any> =[];
    permsArrayAdd: Array<any> =[];
    headerAdd: Array<cell> = [];

    deleteBtn: boolean = false;
    deleteAllBtn: boolean = false;
    addBtn: boolean = false;
    editZTreeBtn: boolean = false;
    paginationBtn: boolean = true;
    searchBtn: boolean = true;
    setBtn: boolean = true;
    isShow: boolean = true;
    isShowTittle: boolean = true;
   treeAdd: boolean = true;

    setOperate: boolean = true;
    editId: string;
    addEditTitle: string = '';
    tableView: boolean = true;
    addView: boolean = false;
    addTreeView: boolean = false;
    editTreeView: boolean = false;
    flag: boolean = false;

    pagination: paginationObj = new paginationObj();
    per_page: string=null;
    find_key: string=null;
    find_val: string=null;
    sort_key: string=null;
    sort_val: string=null;
    url: string = '/api/admin/admins/role/index';
    permsAdd: string;
    permsUpdate: string;
    name: string;
    description: string;
    id: string;
    submitData: string;

    getNodes() {
        this.http.getZtreeNodes().then(data => {
            this.nodes = data['nodes'];
            this.updateNodes = data['nodes'];
        });
    }
    add() {
        this.addEditTitle = '添加';
        this.flag = true;
        this.headerAdd = this.headers.map(d => {
            d.val = '';
            return d;
        });
        this.http.getZtreeNodes().then(data => {
            this.nodes = data['nodes'];
        });
        console.log(this.nodes,'-------默认全选');
        this.permsAdd = 'hearthealth,ecgd-data-show,ecgd-chart-show,ecgd-del,ecgd-download,hhr-show,hhr-del,heart-dev-show,heart-dev-add,heart-dev-edit,heart-dev-del,info-show,info-add,info-edit,info-del,app-upgrade-show,app-upgrade-add,app-upgrade-edit,app-upgrade-del,app-auth-show,app-user-show,app-user-add,app-user-edit,app-user-del,app-role-show,app-role-edit,admin-show,admin-user-show,admin-user-add,admin-user-edit,admin-user-del,admin-role-show,admin-role-add,admin-role-edit,admin-role-del,log';
        this.isShow = false;
        this.isShowTittle = false;
        this.addView = true;
        this.addTreeView=true;
        this.editTreeView=false;
        this.tableView = false;
    }
    del(id){
        this.http.rolesDel(id).then(data => {
            if (data['status'] == 'ok') {
                this.getHeartData(this.url, this.per_page, this.find_key, this.find_val, this.sort_key, this.sort_val);
            } else {
                const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
                this.toastService.toast(toastCfg);
            }
        }).catch(err => {
            const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
            this.toastService.toast(toastCfg);
        });
    }
    edit(id) {

        this.id = this.data[id]['id'];
        console.log(this.id,'编辑的id');
        this.isShow = false;
        this.isShowTittle = true;
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
        this.http.rolesPerms(this.data[id]['id']).then(data => {
            if (data['status'] == 'ok') {
                console.log(data,'获取编辑树');
                this.updateNodes = data['data'];
                this.addView = true;
                this.tableView = false;
                this.addTreeView=false;
                this.editTreeView=true;

            } else {
                const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
                this.toastService.toast(toastCfg);
            }
        }).catch(err => {
            const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
            this.toastService.toast(toastCfg);
        });


    }
    addSubmit(CheckedNodes:any){
        console.log('CheckedNodes',CheckedNodes);
        this.permsArrayAdd = CheckedNodes['CheckedNodes'].map(v =>{
            return v.key;
        });
        this.permsAdd = this.permsArrayAdd.join(',');
        console.log('--------添加----------',this.permsAdd);
        console.log(this.name,this.description);
        console.log(this.permsAdd,'this.permsAdd-------------');


        // if(this.name=='' || this.description==''){
        //     const toastCfg = new ToastConfig(ToastType.ERROR, '','有未填项！', 3000);
        //     this.toastService.toast(toastCfg);
        // }else {
        //     this.http.rolesAdd(this.name,this.description,this.permsAdd).then(data => {
        //         if (data['status'] == 'ok') {
        //             this.data = data['data'];
        //             this.getHeartData(this.url, this.per_page, this.find_key, this.find_val, this.sort_key, this.sort_val);
        //
        //             this.tableView = true;
        //             this.addView=false;
        //             this.addTreeView=false;
        //             this.editTreeView=false;
        //         } else {
        //             const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
        //             this.toastService.toast(toastCfg);
        //         }
        //     }).catch(err => {
        //         const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
        //         this.toastService.toast(toastCfg);
        //     });
        // }
    }
    editSubmit(CheckedNodes:any){
        console.log('CheckedNodes',CheckedNodes);
        this.permsArrayUpdate = CheckedNodes['CheckedNodes'].map(v =>{
            return v.id;
        });
        this.permsUpdate = this.permsArrayUpdate.join(',');
        console.log(this.name,this.description);
        console.log(this.permsUpdate,'this.permsUpdate-----------');

        // if(this.name=='' || this.description==''){
        //     const toastCfg = new ToastConfig(ToastType.ERROR, '','有未填项！', 3000);
        //     this.toastService.toast(toastCfg);
        // }else {
        //     this.http.rolesUpdate(this.id, this.description, this.name, this.permsUpdate).then(data => {
        //         if (data['status'] == 'ok') {
        //             this.data = data['data'];
        //             this.getHeartData(this.url, this.per_page, this.find_key, this.find_val, this.sort_key, this.sort_val);
        //             this.addView = false;
        //             this.addTreeView = false;
        //             this.editTreeView = false;
        //             this.tableView = true;
        //         } else {
        //             const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
        //             this.toastService.toast(toastCfg);
        //         }
        //     }).catch(err => {
        //         const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
        //         console.log('--------err---------',err);
        //         this.toastService.toast(toastCfg);
        //     });
        // }
    }

    submit(){
        console.log(this.permsAdd,'666');

            if(this.flag){
                //添加
                console.log(this.permsAdd,'this.permsAdd');

                if(this.permsAdd){
                    this.http.rolesAdd(this.name,this.description,this.permsAdd).then(data => {
                        if (data['status'] == 'ok') {
                            this.data = data['data'];
                            this.getHeartData(this.url, this.per_page, this.find_key, this.find_val, this.sort_key, this.sort_val);

                            this.tableView = true;
                            this.addView=false;
                            this.addTreeView=false;
                            this.editTreeView=false;
                        } else {
                            const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
                            this.toastService.toast(toastCfg);
                        }
                    }).catch(err => {
                        const toastCfg = new ToastConfig(ToastType.ERROR, '', '管理员角色已存在', 3000);
                        this.toastService.toast(toastCfg);
                    });
                }else{
                    const toastCfg = new ToastConfig(ToastType.ERROR, '', '请选择权限', 3000);
                    this.toastService.toast(toastCfg);
                }

            }else{
                //编辑
                console.log(this.permsUpdate,'this.permsUpdate');

                if(this.permsUpdate){
                    this.http.rolesUpdate(this.id, this.description, this.name, this.permsUpdate).then(data => {
                        if (data['status'] == 'ok') {
                            this.data = data['data'];
                            this.getHeartData(this.url, this.per_page, this.find_key, this.find_val, this.sort_key, this.sort_val);
                            this.addView = false;
                            this.addTreeView = false;
                            this.editTreeView = false;
                            this.tableView = true;
                        } else {
                            const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
                            this.toastService.toast(toastCfg);
                        }
                    }).catch(err => {
                        const toastCfg = new ToastConfig(ToastType.ERROR, '', '管理员角色已存在', 3000);
                        this.toastService.toast(toastCfg);
                    });
                }else if(this.permsUpdate==undefined){
                  console.log('微电影')
                  this.addView = false;
                  this.addTreeView = false;
                  this.editTreeView = false;
                  this.tableView = true;
                }else{
                    const toastCfg = new ToastConfig(ToastType.ERROR, '', '请选择权限', 3000);
                    this.toastService.toast(toastCfg);
                }

            }


    }



    getHeartData(url: string = this.url, per_page: string = this.per_page, find_key: string = this.find_key, find_val: string = this.find_val, sort_key: string = this.sort_key, sort_val: string = this.sort_val) {
        this.http.getData(url, per_page, find_key, find_val, sort_key, sort_val).then(data => {
            if (data['status'] == 'ok') {
                console.log(data['data']['data'],'111111');
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

    delAll(arr: Array<any>) {
        if (arr.length) {
            this.http.rolesDel('' + arr[0]).then(data => {
                if (data['status'] == 'ok') {
                    arr.splice(0, 1);
                    if (arr.length) {
                        this.delAll(arr);
                    } else {
                        this.getHeartData(this.url, this.per_page, this.find_key, this.find_val, this.sort_key, this.sort_val);
                    }
                } else {
                    const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
                    this.toastService.toast(toastCfg);
                    return;
                }
            }).catch(err => {
                const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
                this.toastService.toast(toastCfg);
            });
        }
    }
    cancel() {
        this.addView = false;
        this.addTreeView=false;
        this.editTreeView=false;
        this.tableView = true;
    }
    back(){
        this.tableView = true;
        this.addTreeView=false;
        this.editTreeView=false;
        this.addView=false;
    }
    sendFormValue(formValue){
        // console.log(formValue,'formValue');
        this.name = formValue.name;
        this.description = formValue.description;
    }
}
