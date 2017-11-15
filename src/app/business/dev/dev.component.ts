import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {cell, SortDirection, sortObj, DataType,searchObj} from '../../shared/table/table-list.component';
import {ApiService} from '../../business-service/api/api.service';
import 'rxjs/add/operator/toPromise';
import {ToastConfig, ToastType} from "../../shared/toast/toast-model";
import {ToastService} from '../../shared/toast/toast.service';

@Component({
  selector: 'app-dev',
  templateUrl: './dev.component.html',
  styleUrls: ['./dev.component.css'],
  providers: []
})
export class DevComponent implements OnInit {

  constructor(private http: ApiService,private toastService: ToastService,private router:Router) {
  }

  ngOnInit() {
    this.http.getDevHeader().then(data => {

      if (data.status == 'ok') {
        this.headers=data['headers'];
      } else {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
        this.toastService.toast(toastCfg);
        // this.router.navigate(['/login']);
      }
    }).catch(err => {
      const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
      this.toastService.toast(toastCfg);
    });
    this.http.getDevData().then(data => {
      if (data.status == 'ok') {
        this.data = data['data'];
      } else {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
        this.toastService.toast(toastCfg);
        // this.router.navigate(['/login']);
      }
    }).catch(err => {
      const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
      this.toastService.toast(toastCfg);
    });
  }

  headers: Array<cell> = [];
  headerAdd: Array<cell> = [];
  data: Array<any> = [];
  addEditTitle: string = '添加';

  devDel: boolean = this.http.isHavePerm('heart-dev-del');
  devAdd: boolean = this.http.isHavePerm('heart-dev-add');
  deleteBtn: boolean = this.devDel;
  deleteAllBtn: boolean = this.devDel;
  addBtn: boolean = this.devAdd;

  searchBtn: boolean = true;
  setBtn: boolean = true;
  paginationBtn: boolean = true;
  setOperate: boolean = true;

  tableView: boolean = true;
  addView: boolean = false;

  add() {
    this.addView = true;
    this.tableView = false;
  }

  del(id: number) {
    this.http.postDevDel(id).then(data => {
      console.log(data, '删除');
      this.data = data['data'];
    });
  }

  delAll(checkedList: any) {
    this.http.postDevDelAll(checkedList).then(data => {
      console.log(data, '删除全部');
      this.data = data['data'];
    });
  }

  sort(sort: sortObj) {
    this.http.postDevSort(sort.id, sort.order).then(data => {
      console.log(data, '排序');
      this.data = data['data'];
    });
  }

  submit(AddData: string) {
    this.http.postDevSubmit(AddData).then(data => {
      this.data = data['data'];
    });
    this.addView = false;
    this.tableView = true;
  }

  cancle() {
    this.addView = false;
    this.tableView = true;
  }

  Search(searchObj: searchObj) {
      console.log('dev searchObj:',searchObj);
      // this.selectValue = searchObj.selectValue;
      // this.searchValue = searchObj.searchValue;
      this.http.postDevSearch(searchObj.selectValue,searchObj.searchValue).then(data => {
          console.log('dev Search result:',data);
          this.data = data['data'];
      });
  }
}
