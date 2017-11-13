import {Component, OnInit} from '@angular/core';
import {cell, SortDirection, sortObj, DataType, INPUTTYPE} from '../../../shared/table/table-list.component';
import {ApiService} from '../../../business-service/api/api.service';
import 'rxjs/add/operator/toPromise';

// const headers: Array<cell> = [
//   {
//     key: 'appRole',
//     show: true,
//     name: '账户角色',
//     index: 0,
//     order: SortDirection.NONE,
//     pipe: {type: DataType.ENUM, params: {0:'子账户',1:'主账户'}},
//   },
//   {
//     key: 'subUsersMaxNum',
//     show: true,
//     name: '最大子用户个数',
//     index: 1,
//     order: SortDirection.NONE,
//     pipe: {type: DataType.NONE, params: ''},
//   },
//
// ];
// const data: Array<any> = [//表格內容列表
//   {
//     subUsersMaxNum: 12,
//     appRole: 1,
//     type:1,
//   },
//   {
//     subUsersMaxNum: 2,
//     appRole: 1,
//   },
//   {
//     subUsersMaxNum: 9,
//     appRole: 1,
//   },
//   {
//     subUsersMaxNum: 9,
//     appRole: 1,
//   },
//   {
//     subUsersMaxNum: 19,
//     appRole: 1,
//   },
//   {
//     subUsersMaxNum: 9,
//     appRole: 1,
//   },
//   {
//     subUsersMaxNum: 20,
//     appRole: 1,
//   },
// ];

@Component({
  selector: 'app-app-role',
  templateUrl: './app-role.component.html',
  styleUrls: ['./app-role.component.css'],
  providers: [ApiService]

})
export class AppRoleComponent implements OnInit {

  constructor(private http: ApiService) {
  }

  ngOnInit() {
    this.http.getAppRoleHeader().then(data => {
      this.headers = data['headers'];
    });
    this.http.getAppRoleData().then(data => {
      this.data = data['data'];
    });
  }

  headers: Array<cell> = [];
  headerAdd: Array<cell> = [];

  data: Array<any> = [];

  editId: number;
  addEditTitle: string = '添加';
  addBtn: boolean = true;
  deleteBtn: boolean = true;
  editBtn: boolean = true;
  deleteAllBtn: boolean = true;
  setOperate: boolean = true;

  addView: boolean = false;
  editView: boolean = false;
  tableView: boolean = true;

  del(id: number) {
    this.http.postAppRoleDel(id).then(data => {
      console.log(data, '删除');
      this.data = data['data'];
    });
  }

  delAll(checkedList: any) {
    this.http.postAppRoleDelAll(checkedList).then(data => {
      console.log(data, '删除全部');
      this.data = data['data'];
    });
  }

  sort(sort: sortObj) {
    this.http.postAppRoleSort(sort.id, sort.order).then(data => {
      console.log(data, '排序');
      this.data = data['data'];
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
    this.editView = false;
    this.tableView = true;
  }

  submit(submitData: string) {

    this.addView = false;
    this.editView = false;
    this.tableView = true;
  }
}
