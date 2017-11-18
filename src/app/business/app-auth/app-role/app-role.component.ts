import {Component, OnInit} from '@angular/core';
import {cell, SortDirection, sortObj, DataType, INPUTTYPE} from '../../../shared/table/table-list.component';
import {ApiService} from '../../../business-service/api/api.service';
import 'rxjs/add/operator/toPromise';


@Component({
  selector: 'app-app-role',
  templateUrl: './app-role.component.html',
  styleUrls: ['./app-role.component.css'],
  providers: []

})
export class AppRoleComponent implements OnInit {

  constructor(private http: ApiService) {
  }

  ngOnInit() {
    this.headers= this.http.getHeader('app-roles');
  }

  headers: Array<cell> = [];
  headerAdd: Array<cell> = [];
  data: Array<any> = [];
  editId: number;
  addEditTitle: string = '添加';

  edit: boolean = true;
  // edit: boolean = this.http.isHavePerm('app-role-edit');
  editBtn: boolean = this.edit;

  setOperate: boolean = true;
  paginationBtn: boolean = true;
  addView: boolean = false;
  tableView: boolean = true;



  sort(sort: sortObj) {
    this.http.postAppRoleSort(sort.key,sort.val).then(data => {
      console.log(data, '排序');
      this.data = data['data'];
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

  cancle() {
    this.addView = false;
    this.tableView = true;
  }

  submit(submitData: string) {
    this.http.postAppRoleSubmit(submitData).then(data => {
        console.log(data, '提交');
        this.data = data['data'];
    });
    this.addView = false;
    this.tableView = true;
  }
}
