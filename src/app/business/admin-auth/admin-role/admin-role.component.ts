import { Component, OnInit } from '@angular/core';
import {cell, SortDirection, sortObj,DataType} from '../../../shared/table/table-list.component';
import {ApiService} from '../../../business-service/api/api.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-admin-role',
  templateUrl: './admin-role.component.html',
  styleUrls: ['./admin-role.component.css'],
  providers:[ApiService]
})
export class AdminRoleComponent implements OnInit {

  constructor(private http: ApiService) {}

  ngOnInit() {
      this.http.getAdminRoleHeader().then(data => {
          this.headers = data['headers'];
      });
      this.http.getAdminRoleData().then(data => {
          this.data = data['data'];
      });
  }

  // nodes: any = [
  //       {
  //           id: "1",
  //           checked: true,
  //           open:true,
  //           name: "心电后台管理系统",
  //           children: [
  //               { id: "2", name: "心电数据", checked: true , open:true , children:[
  //                   { id: "3", name: "心电波形" , checked: true, children:[
  //                       { id: "4", name: "删除功能" , checked: true },
  //                       { id: "5", name: "下载功能" , checked: true }
  //                   ]},
  //                   { id: "6", name: "健康档案" , checked: true , children:[
  //                       { id: "7", name: "删除功能" , checked: true }
  //                   ]}
  //               ]},
  //               { id: "8", name: "设备管理"  , checked: true , open:true , children:[
  //                   { id: "9", name: "心电设备" , checked: true , children:[
  //                       { id: "10", name: "添加功能" , checked: true },
  //                       { id: "11", name: "编辑功能" , checked: true },
  //                       { id: "12", name: "删除功能" , checked: true }
  //                   ]}
  //               ]},
  //               { id: "13", name: "信息管理"  , checked: true , open:true , children:[
  //                   { id: "14", name: "公共信息" , checked: true , children:[
  //                       { id: "15", name: "添加功能" , checked: true },
  //                       { id: "16", name: "编辑功能" , checked: true },
  //                       { id: "17", name: "删除功能" , checked: true }
  //                   ]},
  //                   { id: "18", name: "健康资讯" , checked: true , children:[
  //                       { id: "19", name: "添加功能" , checked: true },
  //                       { id: "20", name: "编辑功能" , checked: true },
  //                       { id: "21", name: "删除功能" , checked: true }
  //                   ]},
  //                   { id: "22", name: "商城信息" , checked: true , children:[
  //                       { id: "23", name: "添加功能" , checked: true },
  //                       { id: "24", name: "编辑功能" , checked: true },
  //                       { id: "25", name: "删除功能" , checked: true }
  //                   ]},
  //               ]},
  //               { id: "26", name: "APP升级"  , checked: true , open:true , children:[
  //                   { id: "28", name: "App包管理" , checked: true , children:[
  //                       { id: "29", name: "添加功能" , checked: true },
  //                       { id: "30", name: "编辑功能" , checked: true },
  //                       { id: "31", name: "删除功能" , checked: true }
  //                   ]}
  //               ]},
  //               { id: "32", name: "App权限" , checked: true , open:true , children:[
  //                   { id: "33", name: "App用户" , checked: true , children:[
  //                       { id: "34", name: "添加功能" , checked: true },
  //                       { id: "35", name: "编辑功能" , checked: true },
  //                       { id: "36", name: "删除功能" , checked: true }
  //                   ]},
  //                   { id: "37", name: "App角色" , checked: true , children:[
  //                       { id: "38", name: "添加功能" , checked: true },
  //                       { id: "39", name: "编辑功能" , checked: true },
  //                       { id: "40", name: "删除功能" , checked: true }
  //                   ]}
  //               ]},
  //               { id: "41", name: "后台权限"  , checked: true , open:true , children:[
  //                   { id: "42", name: "后台用户" , checked: true , children:[
  //                       { id: "43", name: "添加功能" , checked: true },
  //                       { id: "44", name: "编辑功能" , checked: true },
  //                       { id: "45", name: "删除功能" , checked: true }
  //                   ]},
  //                   { id: "46", name: "后台角色" , checked: true , children:[
  //                       { id: "47", name: "添加功能" , checked: true },
  //                       { id: "48", name: "编辑功能" , checked: true },
  //                       { id: "49", name: "删除功能" , checked: true }
  //                   ]}
  //               ]},
  //               { id: "50", name: "日志管理"  , checked: true , open:true , children:[
  //                   { id: "51", name: "系统日志" , checked: true , children:[
  //                       { id: "52", name: "查询功能" , checked: true }
  //                   ]}
  //               ]}
  //           ]
  //       }
  //   ];
  nodes:any;
  headers: Array<cell> = [];
  data: Array<any> =[];
  addBtn: boolean = true;
  deleteBtn: boolean = true;
  editBtn: boolean = true;
  deleteAllBtn: boolean = true;
  setOperate: boolean = true;

  tableView: boolean = true;
  addView: boolean = false;
  add(id:number) {
      this.http.getZtreeNodes().then(data => {
          this.nodes = data['nodes'];
      });
    this.tableView = false;
    this.addView=true;
  }

  del(id:number){
    console.log('0000000000000000000000');
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


  back(){
    this.tableView = true;
    this.addView=false;
  }

  addData(){

      // this.addView=false;

    this.tableView = true;
    this.addView=false;
  }
}
