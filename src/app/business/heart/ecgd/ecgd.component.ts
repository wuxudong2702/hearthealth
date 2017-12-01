import {Component, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import {
  cell,
  SortDirection,
  sortObj,
  searchObj,
  DataType,
  paginationObj
} from '../../../shared/table/table-list.component';
import {ApiService} from '../../../business-service/api/api.service';
import 'rxjs/add/operator/toPromise';
import {ToastService} from '../../../shared/toast/toast.service';
import {ToastConfig, ToastType} from '../../../shared/toast/toast-model';
import {timestamp} from "rxjs/operators";

@Component({
  selector: 'app-ecgd',
  templateUrl: './ecgd.component.html',
  styleUrls: ['./ecgd.component.css'],
  providers: []
})

export class EcgdComponent implements OnInit {

  constructor(private cdr: ChangeDetectorRef, private http: ApiService, private toastService: ToastService) {
  }

  ngOnInit(): void {
    if(this.http.hasToken()){
        this.headers = this.http.getHeader('heart-data');
        this.getHeartData(this.url, this.per_page, this.find_key, this.find_val, this.sort_key, this.sort_val);
        // console.log(this.headers, this.data);
        this.http.isHavePerm('ecgd-del').then(v => {
            this.deleteBtn = v;
            this.deleteAllBtn = v;
        });
        this.http.isHavePerm('ecgd-download').then(v => {
            this.downloadBtn = v;
        });
    }
  }

  headers: Array<cell> = [];
  data: Array<any>[];
  result: Array<any> = [];
  dataChart1: Array<any> = [];
  userName: string;
  sense_time: any;
  deleteBtn: boolean = false;
  deleteAllBtn: boolean = false;
  downloadBtn: boolean = false;
  searchBtn: boolean = true;
  detailsBtn: boolean = true;
  setBtn: boolean = true;
  chartBtn: boolean = true;
  paginationBtn: boolean = true;
  setOperate: boolean = true;
  showChartView: boolean = false;
  downloadData: Array<any>;

  pagination: paginationObj = new paginationObj();
  per_page: string=null;
  find_key: string=null;
  find_val: string=null;
  sort_key: string=null;
  sort_val: string=null;
  url: string = '/api/admin/heart/index';

  chart(params) {
    this.userName = params['name'];
    this.sense_time = params['sense_time'];
    this.http.getEcgdDataChart(params['id']).then(data => {
      if (data['status'] == 'ok') {
        this.dataChart1 = data['data'].map( v=>{
            return v*0.002;
        });
        this.showChartView = !this.showChartView;
      } else {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
        this.toastService.toast(toastCfg);
      }
    }).catch(err => {
      const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
      // console.error(err);
      this.toastService.toast(toastCfg);
    });

  }

  back() {
    this.showChartView = !this.showChartView;
  }

  //用户下载的时间转换函数，现在不需要了
  formatDate(time: any) {
    const Dates = new Date(time);
    const year: number = Dates.getFullYear();
    const month: any = ( Dates.getMonth() + 1 ) < 10 ? '0' + ( Dates.getMonth() + 1 ) : ( Dates.getMonth() + 1 );
    const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
    return year + '-' + month + '-' + day;
  }

  download(arr: Array<any>) {
    let link = document.createElement("a");
    if(arr.length){
      this.http.ecgdDownloadData(arr[0]).subscribe(data => {
        // Blob转化为链接
        link.setAttribute("href", window.URL.createObjectURL(data));
         let downloadData;
        this.data.forEach(v=>{
           if(v['heart_data_id']==arr[0]){
             downloadData=v;
             return ;
           }
         });
         // console.log(this.data,downloadData,'downdata');
        link.setAttribute("download", downloadData['name']+'_' +downloadData['mobile']+'_'+ this.formatDate(new Date().getTime()) + '.txt');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        arr.splice(0,1);
        this.download(arr);
      });
    }
  }


  sort(sort: sortObj) {
    this.sort_key = sort.key;
    this.sort_val = sort.val;
    this.getHeartData(this.url, this.per_page, this.find_key, this.find_val, this.sort_key, this.sort_val);
  }

  del(ids: string) {
    this.http.ecgdDelData(ids).then(data => {
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

  search(searchObj: searchObj) {
    this.find_val = searchObj.searchValue;
    this.find_key = searchObj.selectValue;
    this.getHeartData(this.pagination.first_page_url, this.per_page, this.find_key, this.find_val, this.sort_key, this.sort_val);
  }

  paginationChange(parmas) {
    this.per_page = parmas['per_page'];
    if(parmas['url']!=undefined){
      this.url = parmas['url'];
    }
    this.getHeartData( this.url, this.per_page, this.find_key, this.find_val, this.sort_key, this.sort_val);
  }
  delAll(arr: Array<any>) {
    if (arr.length) {
      this.http.ecgdDelData('' + arr[0]).then(data => {
        if (data['status'] == 'ok') {
          arr.splice(0, 1);
          if (arr.length) {
            this.delAll(arr);
          } else {
            this.getHeartData(this.url, this.per_page, this.find_key, this.find_val, this.sort_key, this.sort_val);
            return;
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
  set (set: string) {
    this.http.setHeader('heart-data', set).then(v => v).then(w => {
      this.headers = this.http.getHeader('heart-data');
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
