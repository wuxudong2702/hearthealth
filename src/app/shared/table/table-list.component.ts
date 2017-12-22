import {Component, OnInit, OnChanges, ViewChild, EventEmitter, Input, Output} from '@angular/core';
import {AppService} from '../../app.service';
import {HttpPaginationComponent} from '../../shared/pagination/http-pagination.component';
import {ModalService} from '../../shared/modal/modal.service';
import {DatePipe} from '@angular/common';
import {ConfirmConfig, SetConfig} from '../modal/modal-model';
import {Pipe, PipeTransform} from '@angular/core';
import {ToastService} from '../../shared/toast/toast.service';
import {ToastConfig, ToastType} from '../toast/toast-model';

export enum SortDirection {
  NONE = 0,
  ASC,
  DESC,
}

export enum DataType {
  NONE = 0,
  ENUM,
  DATATIME,
  MONEY,
  NAME,
}

export enum INPUTTYPE {
  INPUT = 0,
  SELECT,
  DATETIME,
  REMINDINPUT
}

export enum INFOTYPE {
  PROTOCOL = 0,
  GUIDE,
  STARTPAGE,
  ABOUTUS,
  HEALTH
}

export class sortObj {
  val: string;
  key: string;
}
export class params{
  count: string;
  page:'1';
  find_key:  string;
  find_val: string;
  sort_key:  string;
  sort_val:  string;
  // parent_id: string
}

export class searchObj {
  selectValue: string;
  searchValue: string;
}

export class paginationObj {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  to: number;
  first_page_url: string;
  last_page_url: string;
  next_page_url: string;
  prev_page_url: string;
}


export class news {
  newsTitle: string;
  content: string;
  author
}

export class pipe {
  type: DataType;
  params: any;
}

export class cell {


  key: string;
  show: boolean;
  name: string;
  index: number;
  order: SortDirection;
  pipe_type: number;
  pipe_params: any;

  val: any;
  select_val: Array<any>;
  valid_example: string;
  required: boolean;
  pattern: string;
  input_type: INPUTTYPE;


}

@Pipe({name: 'CPipe'})
export class CPipePipe implements PipeTransform {
  transform(originalValue: any, pipe_type: number, pipe_params: any): any {

    switch (pipe_type) {
      case DataType.NONE:
        return originalValue;
      case DataType.DATATIME:
        // console.log(originalValue, (new DatePipe('zh-CN')).transform(originalValue, pipe_params));
        // return (new DatePipe('zh-CN')).transform(originalValue, pipe_params);
        return originalValue;
      case DataType.ENUM:
        return pipe_params[originalValue];
      default:
        return originalValue;
    }
  }
}

@Component({
  selector: 'c-table-list',
  templateUrl: './table-list.component.html',
  styles: [`
    tbody tr:hover {
      background-color: lightyellow;
    }
  `],
})

export class TableListComponent implements OnInit, OnChanges {

  ngOnInit(): void {
  }

  ngOnChanges() {
    // console.log(this.headers,this.data,'[[[[[[[[');
    this.headers = this.headers.sort((v1, v2) => {
      return v1.index - v2.index;
    });
  }

  @ViewChild('hp', undefined) hp: HttpPaginationComponent;

  @Input() headers: Array<cell>;
  @Input() data: Array<any>;

  @Input() addBtn: boolean;
  @Input() deleteBtn: boolean;
  @Input() downloadBtn: boolean;
  @Input() searchBtn: boolean;
  @Input() detailsBtn: boolean;
  @Input() ecgdMainAccountBtn: boolean;
  @Input() mainAccountBtn: boolean;
  @Input() toHhrBtn: boolean;
  @Input() toEcgdBtn: boolean;
  @Input() editBtn: boolean;
  @Input() editH5Btn: boolean;
  @Input() editZTreeBtn: boolean;
  @Input() deleteAllBtn: boolean;
  @Input() setBtn: boolean;
  @Input() chartBtn: boolean;
  @Input() chartBtn2: boolean;
  @Input() paginationBtn: boolean;
  @Input() backBtn: boolean;
  @Input() setOperate: boolean;
  @Input() uploadBtn: boolean;
  @Input() unBindBtn: boolean;
  @Input() unBindAllBtn: boolean;
  @Input() pagination: paginationObj;

  @Output() onAdd = new EventEmitter<any>();
  @Output() onDel = new EventEmitter<any>();
  @Output() onDelAll = new EventEmitter<any>();
  @Output() onDownload = new EventEmitter<any>();
  @Output() onSearch = new EventEmitter<any>();
  @Output() onSet = new EventEmitter<any>();
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDetails = new EventEmitter<any>();
  @Output() onMainAccount = new EventEmitter<any>();
  @Output() onToHhr = new EventEmitter<any>();
  @Output() onToEcgd = new EventEmitter<any>();
  @Output() onEcgdMainAccount = new EventEmitter<any>();
  @Output() onChart = new EventEmitter<any>();
  @Output() onChart2 = new EventEmitter<any>();
  @Output() onSort = new EventEmitter<any>();
  @Output() onBack = new EventEmitter<any>();
  @Output() onDefault = new EventEmitter<any>();
  @Output() onEditZTree = new EventEmitter<any>();
  @Output() onEditH5 = new EventEmitter<any>();
  @Output() onPaginationChange = new EventEmitter<any>();
  @Output() onAddService = new EventEmitter<any>();


  url: string = '';
  isDelAll: boolean = false;
  selectValue: string = '';
  searchValue: string = '';
  tableAdd: boolean = false;
  tableEdit: boolean = false;
  editId: number;
  delId: string;
  pageList: Array<number> = [19, 25, 35];
  delAllId: Array<any> = [];
  checkedList: Array<boolean> = [];
  checkedListIds: Array<number> = [];

  delAllChecked() {
    if (!this.isDelAll) {
      this.checkedList = this.data.map(v => true);
    } else {
      this.checkedList = this.data.map(v => false);
    }
  }

  delChecked(i) {
    this.isDelAll = false;
    this.checkedList[i] = !this.checkedList[i];
  }

  add() {
    this.onAdd.emit();
  }

  edit(id: number) {
    // console.log(id, 'table edit id');
    this.onAdd.emit(id);
  }

  editH5(id: number) {
    // console.log('editH5', id);
    this.onEditH5.emit(id);
  }

  editZTree(id: number) {
    this.onEditZTree.emit(id);
  }

  delAll() {
    let checkedListIds = [];
    for (let i = 0; i < this.checkedList.length; i++) {
      if (this.checkedList[i]) {
        let idName = '';
        if (this.data[i]['heart_data_id']) {
          idName = 'heart_data_id';
        } else if (this.data[i]['id']) {
          idName = 'id'
        } else if (this.data[i]['dev_id']) {
          idName = 'dev_id';
        } else {
          const toastCfg = new ToastConfig(ToastType.ERROR, '', '出现id号错误！', 3000);
          this.toastService.toast(toastCfg);
          break;
        }
        // if(this.flag){
        //   this.onDel.emit(''+this.data[i][idName]);
        // }else break;
        checkedListIds.push(this.data[i][idName]);
      }
      this.checkedList[i] = false;
    }
    this.isDelAll = false;
    // console.log(checkedListIds, 'checkedListIds');
    this.onDelAll.emit(checkedListIds);
  }

  download() {
    let downListIds = [];
    for (let i = 0; i < this.checkedList.length; i++) {
      if (this.checkedList[i]) {
        downListIds.push(this.data[i]['heart_data_id']);
      }
    }
    if(downListIds.length){
      this.onDownload.emit(downListIds);
    }else{
      const toastCfg = new ToastConfig(ToastType.ERROR, '', '请选择下载的数据！', 3000);
      this.toastService.toast(toastCfg);
    }
  }

  search() {//用户点击查询按钮
    // console.log(this.headers, 'table list');
      if (!this.selectValue) {
      this.openError('请选择搜索项！');
    } else {
      let searchVal=this.searchValue;
      if(this.selectValue=='sex'){
        switch(searchVal){
          case '男':searchVal='1';break;
          case '女':searchVal='2';break;
          case '1':searchVal='0';break;
          case '2':searchVal='0';break;
        }
      }
      this.onSearch.emit({
        selectValue: this.selectValue,
        searchValue: searchVal,
      });
    }
    // console.log(this.headers, 'table list');
  }

  set () {
    this.onSet.emit({});
  }

  showModalSetFunc() {//设置模态框
    let setConfig = new SetConfig('', this.headers);
    let result = this.modalService.set(setConfig);
    result.then(v => {
      let set = '';
      // console.log(v,'table list set v');
      v.configHeaders.forEach((v, index) => {
        set += v.key + ',' + v.show + ',' + v.index + ';';
      });
      this.onSet.emit(set);
    }).catch(v => {
    });
  }

  showModalDelAll() {
    function isChecked(i) {
      return i == true;
    }
    if (this.checkedList.some(isChecked)) {
      let confirmCfg = new ConfirmConfig('您确认删除吗？！');
      let result = this.modalService.confirm(confirmCfg);
      result.then(v => {
        this.delAll();
      }).catch(v => {
      })
    } else {
      const toastCfg = new ToastConfig(ToastType.ERROR, '', '请选择删除的数据！', 3000);
      this.toastService.toast(toastCfg);
    }
  }

  showModalDel(i: number) {
    let confirmCfg = new ConfirmConfig('您确认删除吗？！');
    let result = this.modalService.confirm(confirmCfg);
    result.then(v => {
      if (this.data[i]['heart_data_id'] == undefined) {
        // console.log(this.delId, 'this.delId');
        if (this.data[i]['dev_id'] == undefined) {
          this.delId = '' + this.data[i]['id'];
        } else {
          this.delId = '' + this.data[i]['dev_id'];
        }
      } else {
        this.delId = '' + this.data[i]['heart_data_id'];
      }
      // console.log(this.delId, 'this.delId2');
      this.onDel.emit(this.delId);
      this.checkedList[i] = false;
    }).catch(v => {
    })
  }

  details(id: number) {
    this.onDetails.emit(id);
  }

  showMainAccount(id: number) {
    this.onMainAccount.emit(id);
  }

  toHhr(id: number) {
    this.onToHhr.emit(id);
  }

  toEcgd(id: number) {
    this.onToEcgd.emit(id);
  }

  showEcgdMainAccount(id: number) {
    this.onMainAccount.emit(id);
  }

  //Ecgd
  chart(row: any) {
    this.onChart.emit({
      id: row['heart_data_id'],
      user_id: row['user_id'],
      name: row['name'],
      sense_time: row['sense_time']
    });
  }
  //Hhr
  chart2(id: number, name: string, i: number) {
    this.onChart2.emit({
      id: id,
      name: name,
      i: i
    });
  }

  sort(i: string) {
    let order = '';
    this.headers[i].order = this.headers[i].order === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC;
    if (this.headers[i].order == 1) {
      order = 'asc';
    } else {
      order = 'desc';
    }
    this.onSort.emit(
      {
        val: order,
        key: this.headers[i]['key'],
      }
    );
  }

  back() {
    this.onBack.emit();
  }

  default(id) {
    this.onDefault.emit(id);
  }

  openError(errorInfo) {
    let toastCfg = new ToastConfig(ToastType.ERROR, '', errorInfo, 3000);
    this.toastService.toast(toastCfg);
  }


  constructor(private modalService: ModalService, private appService: AppService, private toastService: ToastService) {
    this.appService.titleEventEmitter.emit('');

  }

  onDataChanged($event) {
    console.info($event);
  }

  paginationChange(params) {
    this.onPaginationChange.emit(params);
  }

}
