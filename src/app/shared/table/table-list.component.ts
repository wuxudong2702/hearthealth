import {Component, OnInit, ViewChild, EventEmitter, Input, Output} from '@angular/core';
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
}

export enum INFOTYPE {
  PROTOCOL = 0,
  GUIDE,
  STARTPAGE,
  ABOUTUS,
  HEALTH
}

export class sortObj {
  order: SortDirection;
  id: string;
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
        return (new DatePipe('zh-CN')).transform(originalValue, pipe_params);
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

export class TableListComponent implements OnInit {

  ngOnInit(): void {
    // console.log(this.headers,'tablelist');
    this.headers = this.headers.sort((v1, v2) => {
      return v1.index - v2.index;
    });
    // console.log(this.headers)
  }

  @ViewChild('hp', undefined) hp: HttpPaginationComponent;

  @Input() headers: Array<cell>;
  @Input() data: Array<any>;

  @Input() addBtn: boolean;
  @Input() deleteBtn: boolean;
  @Input() downloadBtn: boolean;
  @Input() searchBtn: boolean;
  @Input() detailsBtn: boolean;
  @Input() editBtn: boolean;
  @Input() editH5Btn: boolean;
  @Input() editZTreeBtn: boolean;
  @Input() deleteAllBtn: boolean;
  @Input() setBtn: boolean;
  @Input() chartBtn: boolean;
  @Input() paginationBtn: boolean;
  @Input() backBtn: boolean;
  @Input() setOperate: boolean;
  @Input() uploadBtn: boolean;

  @Input() pagination: paginationObj;


  // @Input() addCommonBtn: boolean;


  // @Output() onAddSubmit = new EventEmitter<any>();
  @Output() onAdd = new EventEmitter<any>();
  @Output() onDel = new EventEmitter<any>();
  @Output() onDelAll = new EventEmitter<any>();
  @Output() onDownload = new EventEmitter<any>();
  @Output() onSearch = new EventEmitter<any>();
  @Output() onSet = new EventEmitter<any>();
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDetails = new EventEmitter<any>();
  @Output() onChart = new EventEmitter<any>();
  @Output() onSort = new EventEmitter<any>();
  @Output() onBack = new EventEmitter<any>();
  @Output() onUpload = new EventEmitter<any>();
  @Output() onEditZTree = new EventEmitter<any>();
  @Output() onEditH5 = new EventEmitter<any>();
  @Output() onPaginationChange = new EventEmitter<any>();


  url: string = '';
  isDelAll: boolean = false;
  selectValue: string = '';
  searchValue: string = '';
  tableAdd: boolean = false;
  tableEdit: boolean = false;
  editId: number;
  pageList: Array<number> = [19, 25, 35];
  delAllId: Array<any> = [];
  checkedList: Array<boolean> = [];

  // submitData:object;
  delAllChecked() {
    if (!this.isDelAll) {
      this.checkedList = this.data.map(v => true);
    } else {
      this.checkedList = this.data.map(v => false);
    }
  }

  delChecked(index) {
    this.isDelAll = false;
  }

  add() {
    this.onAdd.emit();
  }

  edit(id: number) {
    this.onAdd.emit(id);
  }

  editH5(id: number) {
    console.log('editH5', id);
    this.onEditH5.emit(id);
  }

  editZTree(id: number) {

    console.log('editZTree', id);
    this.onEditZTree.emit(id);
  }

  del(id) {
    this.onDel.emit(id);
  }

  delAll() {
    this.onDelAll.emit({
      checkedList: this.checkedList,
    });
  }

  click(id) {
    this.delAllId.push(id);
  }

  download() {
    this.onDownload.emit();
  }

  search() {
    if (!this.selectValue) {
      this.openError('请选择搜索项！');
    } else if (!this.searchValue) {
      this.openError('请输入关键字！');
    } else {
      console.log('table-list search selectValue searchValue', this.selectValue, this.searchValue);
      this.onSearch.emit({
        selectValue: this.selectValue,
        searchValue: this.searchValue,
      });
    }
  }

  set () {
    this.onSet.emit({});
  }

  showModalSetFunc() {//模态框
    let setConfig = new SetConfig('', this.headers);
    let result = this.modalService.set(setConfig);
    result.then(v => {
      this.headers = v.configHeaders;
    }).catch(v => {
    });
  }

  showModalDelAll() {
    let confirmCfg = new ConfirmConfig('您确认删除吗？！');
    let result = this.modalService.confirm(confirmCfg);
    result.then(v => {
      this.delAll();
    }).catch(v => {
    })
  }

  showModalDel(i) {
    let confirmCfg = new ConfirmConfig('您确认删除吗？！');
    let result = this.modalService.confirm(confirmCfg);
    result.then(v => {
      this.del(i);
    }).catch(v => {
    })
  }

  details(id: number) {
    this.onDetails.emit(id);
  }

  chart(id: number) {
    this.onChart.emit(
      id
    );
  }

  sort(i) {
    this.headers[i].order = this.headers[i].order === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC;
    this.onSort.emit(
      {
        order: this.headers[i].order,
        id: i,
      }
    );
  }

  back() {
    this.onBack.emit();
  }

  upload() {
    this.onUpload.emit();
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

  paginationChange(parmas) {
    this.onPaginationChange.emit(parmas);
  }

}
