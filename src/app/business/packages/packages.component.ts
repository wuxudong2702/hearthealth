import {Component, OnInit} from '@angular/core';
import {
  cell, SortDirection, sortObj, DataType, INPUTTYPE,
  paginationObj, searchObj
} from '../../shared/table/table-list.component';
import {ApiService} from '../../business-service/api/api.service';
import 'rxjs/add/operator/toPromise';
import {ToastService} from '../../shared/toast/toast.service';
import {ToastConfig, ToastType} from '../../shared/toast/toast-model';


@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css'],
  providers:[]
})
export class PackagesComponent implements OnInit {

  constructor(private http: ApiService, private toastService: ToastService) {
  }

  ngOnInit() {
    this.headers = this.http.getHeader('app-upgrades');
    this.getHeartData(this.url);

    this.http.isHavePerm('app-upgrade-del').then(v => {
      this.deleteBtn = v;
      this.deleteAllBtn = v;
    });

    this.http.isHavePerm('app-upgrade-edit').then(v => {
      this.editBtn = v;
    });
    this.http.isHavePerm('app-upgrade-add').then(v => {
      this.addBtn = v;
    });
  }

  headers: Array<cell> = [];
  data: Array<any> = [];
  headerAdd: Array<cell> = [];
  editId: number;
  addEditTitle: string = '添加';
  addView: boolean = false;
  tableView: boolean = true;

  // PDel: boolean = false;//this.http.isHavePerm('app-upgrade-del');
  // PAdd: boolean = false;//this.http.isHavePerm('app-upgrade-add');
  // PEdit: boolean = false;//this.http.isHavePerm('app-upgrade-edit');

  deleteBtn: boolean = false;
  deleteAllBtn: boolean = false;
  addBtn: boolean = false;
  editBtn: boolean = false;
  searchBtn: boolean = true;

  setOperate: boolean = true;
  paginationBtn: boolean = true;
  flag:boolean=true;
  pagination: paginationObj = new paginationObj();
  per_page: string = null;
  find_key: string = null;
  find_val: string = null;
  sort_key: string = null;
  sort_val: string = null;
  url: string = '/api/admin/upgrade/index';

  del(packages_id:string){
      this.http.packagesDel(packages_id).then(data => {
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

  add(id: number) {
    if (id >= 0) {
      this.flag=false;
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
    }
    else {
      this.flag=true;
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

  submit(submitData) {
    if(this.flag){
      this.http.upgradeAdd(submitData.ver,submitData.desc,submitData.url).then(data => {
        if (data['status'] == 'ok') {
          this.data = data['data'];
          this.getHeartData();
          this.addView = false;
          this.tableView = true;
        } else {
          const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
          this.toastService.toast(toastCfg);
        }
      }).catch(err => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
        this.toastService.toast(toastCfg);
      });
    }else{
      this.http.upgradeUpdate(submitData.id,submitData.ver,submitData.desc,submitData.url).then(data => {
        if (data['status'] == 'ok') {
          this.data = data['data'];
          this.getHeartData();
          this.addView = false;
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
    this.http.setHeader('app-upgrades', set).then(v => v).then(w => {
      this.headers = this.http.getHeader('app-upgrades');
    });
  }
  paginationChange(parmas) {
    this.per_page = parmas['per_page'];
    this.url = parmas['url'];
    this.getHeartData(this.url, this.per_page, this.find_key, this.find_val, this.sort_key, this.sort_val);
//     this.http.getEcgdData(parmas['url'],parmas['per_page']).then(data => {
//       if (data['status'] == 'ok') {
//   this.data = data['data']['data'];
//   this.pagination.current_page=data['data']['current_page'];
//   this.pagination.last_page=data['data']['last_page'];
//   this.pagination.per_page=data['data']['per_page'];
//   this.pagination.total=data['data']['total'];
//   this.pagination.first_page_url=data['data']['first_page_url'];
//   this.pagination.last_page_url=data['data']['last_page_url'];
//   this.pagination.next_page_url=data['data']['next_page_url'];
//   this.pagination.prev_page_url=data['data']['prev_page_url'];
//   this.pagination.to=data['data']['to'];
// } else {
//   const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
//   this.toastService.toast(toastCfg);
// }
// }).catch(err => {
//   const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
//   console.error(err);
//   this.toastService.toast(toastCfg);
// });
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


//   sort(sort: sortObj) {
//     this.sort_key = sort.key;
//     this.sort_val = sort.val;
//     this.getHeartData(this.url, this.per_page, this.find_key, this.find_val, this.sort_key, this.sort_val);
//   }
//
//   del(ids: string) {
//     this.http.ecgdDelData(ids).then(data => {
//       if (data['status'] == 'ok') {
//         this.getHeartData();
//       } else {
//         const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
//         this.toastService.toast(toastCfg);
//       }
//     }).catch(err => {
//       const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
//       this.toastService.toast(toastCfg);
//     });
//   }
//
//   search(searchObj: searchObj) {
//     this.find_val = searchObj.searchValue;
//     this.find_key = searchObj.selectValue;
//     this.getHeartData(this.url, this.per_page, this.find_key, this.find_val, this.sort_key, this.sort_val);
//   }
//
//   paginationChange(parmas) {
//     this.per_page = parmas['per_page'];
//     this.url = parmas['url'];
//     this.getHeartData( this.url, this.per_page, this.find_key, this.find_val, this.sort_key, this.sort_val);
// //     this.http.getEcgdData(parmas['url'],parmas['per_page']).then(data => {
// //       if (data['status'] == 'ok') {
// //   this.data = data['data']['data'];
// //   this.pagination.current_page=data['data']['current_page'];
// //   this.pagination.last_page=data['data']['last_page'];
// //   this.pagination.per_page=data['data']['per_page'];
// //   this.pagination.total=data['data']['total'];
// //   this.pagination.first_page_url=data['data']['first_page_url'];
// //   this.pagination.last_page_url=data['data']['last_page_url'];
// //   this.pagination.next_page_url=data['data']['next_page_url'];
// //   this.pagination.prev_page_url=data['data']['prev_page_url'];
// //   this.pagination.to=data['data']['to'];
// // } else {
// //   const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
// //   this.toastService.toast(toastCfg);
// // }
// // }).catch(err => {
// //   const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
// //   console.error(err);
// //   this.toastService.toast(toastCfg);
// // });
//   }
//
//   set (set: string) {
//     this.http.setHeader('heart-data', set).then(v => v).then(w => {
//       this.headers = this.http.getHeader('heart-data');
//       console.log(this.headers, '------0-0-0-');
//     });
//   }
//
//   getHeartData(url: string = this.url, per_page: string = this.per_page, find_key: string = this.find_key, find_val: string = this.find_val, sort_key: string = this.sort_key, sort_val: string = this.sort_val) {
//     this.http.getData(url, per_page, find_key, find_val, sort_key, sort_val).then(data => {
//       if (data['status'] == 'ok') {
//         this.data = data['data']['data'];
//         this.pagination.current_page = data['data']['current_page'];
//         this.pagination.last_page = data['data']['last_page'];
//         this.pagination.per_page = data['data']['per_page'];
//         this.pagination.total = data['data']['total'];
//         this.pagination.first_page_url = data['data']['first_page_url'];
//         this.pagination.last_page_url = data['data']['last_page_url'];
//         this.pagination.next_page_url = data['data']['next_page_url'];
//         this.pagination.prev_page_url = data['data']['prev_page_url'];
//         this.pagination.to = data['data']['to'];
//         // console.log(this.pagination,'pagination======');
//       } else {
//         const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
//         this.toastService.toast(toastCfg);
//       }
//     }).catch(err => {
//       const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
//       this.toastService.toast(toastCfg);
//     });
//   }

}
