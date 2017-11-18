import {Component, OnInit,OnChanges, ViewChild, EventEmitter, Input, Output} from '@angular/core';
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
  val: string;
  key: string;
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

export class TableListComponent implements OnInit, OnChanges{

  ngOnInit(): void {}
  ngOnChanges(){
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

  @Input() pagination: paginationObj;

  @Output() onAdd = new EventEmitter<any>();
  @Output() onDel = new EventEmitter<any>();
  @Output() onDownload = new EventEmitter<any>();
  @Output() onSearch = new EventEmitter<any>();
  @Output() onSet = new EventEmitter<any>();
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDetails = new EventEmitter<any>();
  @Output() onChart = new EventEmitter<any>();
  @Output() onChart2 = new EventEmitter<any>();
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
  delId:string;
  pageList: Array<number> = [19, 25, 35];
  delAllId: Array<any> = [];
  checkedList: Array<boolean> = [];
  checkedListIds:Array<number>=[];
  // submitData:object;
  delAllChecked() {
    if (!this.isDelAll) {
      this.checkedList = this.data.map(v => true);
    } else {
      this.checkedList = this.data.map(v => false);
    }
  }

  delChecked(i) {
      this.isDelAll = false;
      this.checkedList[i]= !this.checkedList[i];
  }

  add() {
    this.onAdd.emit();
  }

  edit(id: number) {
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
    let checkedListIds='';
    for(let i=0;i<this.checkedList.length;i++){
         if(this.checkedList[i]){
           // console.log(this.checkedList,this.data);
           if(i==this.checkedList.length-1){
             checkedListIds+=this.data[i]['heart_data_id'];
           }else{
             checkedListIds+=this.data[i]['heart_data_id']+',';
           }
         }
         this.checkedList[i]=false;
    }
    this.isDelAll = false;
    this.onDel.emit(checkedListIds);
  }

  download() {
    let checkedListIds='';
    for(let i=0;i<this.checkedList.length;i++){
      if(this.checkedList[i]){
        if(i==this.checkedList.length-1){
          checkedListIds+=this.data[i]['heart_data_id'];
        }else{
          checkedListIds+=this.data[i]['heart_data_id']+',';
        }
      }
    }
    this.onDownload.emit(checkedListIds);
  }

  search() {//用户点击查询按钮
    if (!this.selectValue) {
      this.openError('请选择搜索项！');
    } else {
      this.onSearch.emit({
        selectValue: this.selectValue,
        searchValue: this.searchValue,
      });
    }
  }

  set () {
    this.onSet.emit({});
  }

  showModalSetFunc() {//设置模态框
    let setConfig = new SetConfig('', this.headers);
    let result = this.modalService.set(setConfig);
    result.then(v => {
      let set='';
      v.configHeaders.forEach((v,index)=>{
        set+=v.key+','+v.show+','+v.index+';';
      });
      this.onSet.emit(set);
    }).catch(v => {
    });
  }

  showModalDelAll() {
    function isChecked(i) {
          return i == true;
    }
    if(this.checkedList.some(isChecked)){
        let confirmCfg = new ConfirmConfig('您确认删除吗？！');
        let result = this.modalService.confirm(confirmCfg);
        result.then(v => {
            this.delAll();
        }).catch(v => {
        })
    }else{
        const toastCfg = new ToastConfig(ToastType.ERROR, '','请选择删除的数据！', 3000);
        this.toastService.toast(toastCfg);
    }
  }

  showModalDel(i:number) {
    let confirmCfg = new ConfirmConfig('您确认删除吗？！');
    let result = this.modalService.confirm(confirmCfg);
    result.then(v => {

      if(this.data[i]['heart_data_id']==undefined){
        console.log( this.delId,'00000000');
        if(this.data[i]['dev_id']==undefined){
          this.delId=''+this.data[i]['id'];
        }else{
          this.delId=''+this.data[i]['dev_id'];
        }
      }else{
        this.delId=''+this.data[i]['heart_data_id'];
      }
      console.log( this.delId,'111111');
      this.onDel.emit(this.delId);
      this.checkedList[i]=false;
    }).catch(v => {
    })
  }

  details(id: number) {
    this.onDetails.emit(id);
  }

  chart(id: number,name:string,sense_time:any) {
    this.onChart.emit({
      id:id,
      name:name,
      sense_time:sense_time
    });
  }
  chart2(id: number) {
    this.onChart2.emit(id);
  }

  sort(i:string) {
   let order='';
    this.headers[i].order = this.headers[i].order === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC;
    if(this.headers[i].order==1){
      order='asc';
    }else{
      order='desc';
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
