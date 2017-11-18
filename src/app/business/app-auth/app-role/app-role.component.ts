import {Component, OnInit} from '@angular/core';
import {cell, SortDirection, sortObj, searchObj, paginationObj, DataType, INPUTTYPE} from '../../../shared/table/table-list.component';
import {ApiService} from '../../../business-service/api/api.service';
import 'rxjs/add/operator/toPromise';
import {ToastService} from '../../../shared/toast/toast.service';
import {ToastConfig, ToastType} from '../../../shared/toast/toast-model';

@Component({
  selector: 'app-app-role',
  templateUrl: './app-role.component.html',
  styleUrls: ['./app-role.component.css'],
  providers: []

})
export class AppRoleComponent implements OnInit {

  constructor(private http: ApiService, private toastService: ToastService) {
  }

  ngOnInit() {
    this.headers= this.http.getHeader('app-roles');
    this.getHeartData(this.url);
    console.log(this.headers, this.data);
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

  per_page: string=null;
  find_key: string=null;
  find_val: string=null;
  sort_key: string=null;
  sort_val: string=null;
  url: string = '/api/admin/app/role/index';

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
    this.http.postAppRoleSubmit(submitData).then(data => {
        console.log(data, '提交');
        this.data = data['data'];
    });
    this.addView = false;
    this.tableView = true;
  }

    sort(sort: sortObj) {
        this.sort_key = sort.key;
        this.sort_val = sort.val;
        this.getHeartData(this.url, this.per_page, this.find_key, this.find_val, this.sort_key, this.sort_val);
    }

    search(searchObj: searchObj) {
        this.find_val = searchObj.searchValue;
        this.find_key = searchObj.selectValue;
        this.getHeartData(this.url, this.per_page, this.find_key, this.find_val, this.sort_key, this.sort_val);
    }
    set (set: string) {
        this.http.setHeader('app-roles', set).then(v => v).then(w => {
            this.headers = this.http.getHeader('app-roles');
        });
    }

  getHeartData(url: string = this.url, per_page: string = this.per_page, find_key: string = this.find_key, find_val: string = this.find_val, sort_key: string = this.sort_key, sort_val: string = this.sort_val) {
        this.http.getData(url, per_page, find_key, find_val, sort_key, sort_val).then(data => {
            if (data['status'] == 'ok') {
                this.data = data['data']['data'];

            } else {
                const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
                this.toastService.toast(toastCfg);
            }
        }).catch(err => {
            const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
            this.toastService.toast(toastCfg);
        });
    }

}
