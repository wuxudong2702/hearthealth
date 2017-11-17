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
    this.headers = this.http.getHeader('heart-data');
    // this.http.getEcgdData().then(data => {
    //   if (data['status'] == 'ok') {
    //     this.data = data['data']['data'];
    //     this.pagination.current_page=data['data']['current_page'];
    //     this.pagination.last_page=data['data']['last_page'];
    //     this.pagination.per_page=data['data']['per_page'];
    //     this.pagination.total=data['data']['total'];
    //     this.pagination.first_page_url=data['data']['first_page_url'];
    //     this.pagination.last_page_url=data['data']['last_page_url'];
    //     this.pagination.next_page_url=data['data']['next_page_url'];
    //     this.pagination.prev_page_url=data['data']['prev_page_url'];
    //     this.pagination.to=data['data']['to'];
    //   } else {
    //     const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
    //     this.toastService.toast(toastCfg);
    //   }
    // }).catch(err => {
    //   const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
    //   this.toastService.toast(toastCfg);
    // });
    this.getData();
    this.http.isHavePerm('ecgd-del').then(v => {
      this.deleteBtn = v;
      this.deleteAllBtn = v;
    });

    this.http.isHavePerm('ecgd-download').then(v => {
      this.downloadBtn = v;
    });

    // this.http.getDevHeader().then(data => {
    //
    //   if (data.status == 'ok') {
    //     this.headers=data['headers'];
    //   } else {
    //     const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
    //     this.toastService.toast(toastCfg);
    //     // this.router.navigate(['/login']);
    //   }
    // }).catch(err => {
    //   const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
    //   this.toastService.toast(toastCfg);
    // });
    // this.http.getDevData().then(data => {
    //   if (data.status == 'ok') {
    //     this.data = data['data'];
    //   } else {
    //     const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
    //     this.toastService.toast(toastCfg);
    //     // this.router.navigate(['/login']);
    //   }
    // }).catch(err => {
    //   const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
    //   this.toastService.toast(toastCfg);
    // });
  }

  headers: Array<cell> = [];
  data: Array<any>[];
  result: Array<any> = [];
  // dataChart: Array<any> = [];
  dataChart1: Array<any> = [];

  pagination: paginationObj = new paginationObj();

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

  getData(url: string = '/api/admin/heart/index', per_page: string = '8') {
    this.http.getEcgdData(url,per_page).then(data => {
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

  onChart(params) {
    this.userName = params['name'];
    this.sense_time = params['sense_time'];
    this.http.getEcgdDataChart(params['id']).then(data => {
      if (data['status'] == 'ok') {
        this.dataChart1 = data['data'];
        this.showChartView = !this.showChartView;
      } else {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
        this.toastService.toast(toastCfg);
      }
    }).catch(err => {
      const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
      console.error(err);
      this.toastService.toast(toastCfg);
    });

  }

  back() {
    this.showChartView = !this.showChartView;
  }

  onSort(sort: sortObj) {
    console.log(sort, '3456789');
    this.http.postEcgdSort(sort.id, sort.order).then(data => {
      this.data = data['data'];
    });
  }


  onSearch(searchObj: searchObj) {
    console.log(searchObj, 'ecgd Search searchObj');
    this.http.postEcgdSearch(searchObj.selectValue, searchObj.searchValue).then(data => {
      console.log(data, 'ecgd Search result');
      this.data = data['data'];
    });
  }

  onUpload() {
  }

  paginationChange(parmas) {
    this.getData(parmas['url'],parmas['per_page']);
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

  onDel(ids: string) {
    this.http.ecgdDelData(ids).then(data => {
      if (data['status'] == 'ok') {
   this.getData();
      } else {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
        this.toastService.toast(toastCfg);
      }
    }).catch(err => {
      const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
      this.toastService.toast(toastCfg);
    });
  }

  formatDate(time: any) {
    const Dates = new Date(time);
    const year: number = Dates.getFullYear();
    const month: any = ( Dates.getMonth() + 1 ) < 10 ? '0' + ( Dates.getMonth() + 1 ) : ( Dates.getMonth() + 1 );
    const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
    return year + '-' + month + '-' + day;
  };

  download(i: string) {
    let link = document.createElement("a");
    this.http.ecgdDownloadData(i).subscribe(data => {
      // Blob转化为链接
      link.setAttribute("href", window.URL.createObjectURL(data));
      link.setAttribute("download", 'heart_data' + this.formatDate(new Date().getTime()) + '.txt');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
}
