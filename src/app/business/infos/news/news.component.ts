import { Component, OnInit} from '@angular/core';
import {
    cell,
    SortDirection,
    sortObj,
    news,
    DataType,
    searchObj,
    INFOTYPE,
    paginationObj, params
} from '../../../shared/table/table-list.component';
import {ApiService} from '../../../business-service/api/api.service';
import 'rxjs/add/operator/toPromise';
import {ToastService} from '../../../shared/toast/toast.service';
import {ToastConfig, ToastType} from '../../../shared/toast/toast-model';
import {Editorh5Component} from '../../../business-shared/H5editor/editorh5.component';

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.css'],
    providers: []
})
export class NewsComponent implements OnInit {

    constructor(private http: ApiService, private  toastService: ToastService) {
    }

    ngOnInit() {
        if (this.http.hasToken()) {
            this.headers = this.http.getHeader('infos');
            this.params['page'] = '1';
            this.getHeartData(this.url, this.params);
            this.http.isHavePerm('info-del').then(v => {
                this.deleteBtn = v;
                this.deleteAllBtn = v;
            });

            this.http.isHavePerm('info-edit').then(v => {
                this.editH5Btn = v;
            });
            this.http.isHavePerm('info-add').then(v => {
                this.addBtn = v;
            });
        }
    }
   ngAfterViewInit(){

}
    headers: Array<cell> = [];
    data: Array<any> = [];
    H5Type: Array<any> = [
        {key: INFOTYPE.GUIDE, value: '新手指南'},
        {key: INFOTYPE.STARTPAGE, value: '启动页'},
        {key: INFOTYPE.ABOUTUS, value: '关于我们'},
        {key: INFOTYPE.PROTOCOL, value: '用户注册协议'},
        {key: INFOTYPE.HEALTH, value: '健康资讯'}
    ];
    dataEditor: Array<any> = [];
    isSelectShow: boolean = false;


    deleteBtn: boolean = false;
    deleteAllBtn: boolean = false;
    addBtn: boolean = false;
    editH5Btn: boolean = false;
    addServiceBtn: boolean = true;
    searchBtn: boolean = true;
    setBtn: boolean = true;
    paginationBtn: boolean = true;
    setOperate: boolean = true;
    editor: boolean = false;
    phoneShow: boolean = false;
    pagination: paginationObj = new paginationObj();
    HTML5Content: string;
    url: string = '/api/admin/info/index';
    params: params = new params();

    flag: boolean = true;
    id: string;
    description: string;
    price: string;
    bannerUrl: string = "http://www.w3school.com.cn/i/eg_tulip.jpg";
    suggestionUrl1: string = "http://www.w3school.com.cn/i/eg_tulip.jpg";
    suggestionUrl2: string = "http://www.w3school.com.cn/i/eg_tulip.jpg";
    suggestionUrl3: string = "http://www.w3school.com.cn/i/eg_tulip.jpg";
    productUrl: string = "http://www.w3school.com.cn/i/eg_tulip.jpg";



    addService(){
        this.bannerUrl= this.data[0]['url'];
         console.log(document.getElementById('banner'),'-------');
        this.http.valueAddedView().then(data => {
          if (data['status'] == 'ok') {
            console.log(data, 'data');
            document.getElementById('banner').innerHTML = data['data']['banner'];
          }
        }).catch(err => {
          const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
          this.toastService.toast(toastCfg);
        });

        this.phoneShow = true;
    }

    editH5(i: number) {
        this.dataEditor = this.data[i];
        this.flag = false;
        this.id = this.data[i]['id'];

        this.http.infoContent(this.id).then(data => {
            if (data['status'] == 'ok') {
                // this.getHeartData(this.url, this.per_page, '1', this.find_key, this.find_val, this.sort_key, this.sort_val);
                this.HTML5Content = data['data'];
                // console.log(this.HTML5Content,' vcccccccccccccccccccc');
                this.editor = true;
                this.isSelectShow = false;

            } else {
                const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
                this.toastService.toast(toastCfg);
            }
        }).catch(err => {
            const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
            this.toastService.toast(toastCfg);
        });
    }

    onEditBack(id: number) {
        this.editor = false;
        this.isSelectShow = false;
        this.HTML5Content = '';
    }

    onSave(selectValue: any) {
        this.editor = false;
        this.isSelectShow = false;
    }

    onPost(selectValue: any) {
        this.editor = false;
        this.isSelectShow = false;
    }


    add() {
        this.flag = true;
        this.editor = true;
        this.isSelectShow = true;
        this.dataEditor = [];
    }

    del(info_id: string) {
        this.http.infoDel(info_id).then(data => {
            if (data['status'] == 'ok') {
                this.params['page'] = '1';
                this.getHeartData(this.url, this.params);
            } else {
                const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
                this.toastService.toast(toastCfg);
            }
        }).catch(err => {
            const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
            this.toastService.toast(toastCfg);
        });
    }

    delAll(arr: Array<any>) {
        if (arr.length) {
            this.http.infoDel('' + arr[0]).then(data => {
                if (data['status'] == 'ok') {
                    arr.splice(0, 1);
                    if (arr.length) {
                        this.delAll(arr);
                    } else {
                        this.params['page'] = '1';
                        this.getHeartData(this.url, this.params);
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

    set(set: string) {
        this.http.setHeader('infos', set).then(v => v).then(w => {
            this.headers = this.http.getHeader('infos');
        });
    }

    save(html) {
        // console.log( html,'===============');
        if (this.flag) {
            this.http.uploadHtml5Page(html.title, html.description, html.label, html.header, html.content, html.footer).then(data => {
                if (data['status'] == 'ok') {
                    this.params['page'] = '1';
                    this.getHeartData(this.url, this.params);
                    this.editor = false;
                } else {
                    const toastCfg = new ToastConfig(ToastType.ERROR, '', data.message, 3000);
                    this.toastService.toast(toastCfg);
                }
            }).catch(err => {
                const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
                this.toastService.toast(toastCfg);
            });
        } else {
            // console.log(html, ']]]]]]]]]]]]]]]]]');
            this.http.upDataHtml5Page(this.id, html.title, html.description, html.label, html.header, html.content, html.footer).then(data => {
                if (data['status'] == 'ok') {
                    this.params['page'] = '1';
                    this.getHeartData(this.url, this.params);
                    this.editor = false;
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
        this.params['sort_key'] = sort.key;
        this.params['sort_val'] = sort.val;
        this.getHeartData(this.url, this.params);
    }

    search(searchObj: searchObj) {
        this.params['find_key'] = searchObj.selectValue;
        this.params['find_val'] = searchObj.searchValue;
        this.params['page'] = '1';
        this.getHeartData(this.url, this.params);
    }

    paginationChange(params) {
        this.params['page'] = params['page'];
        this.params['count'] = params['per_page'];
        this.getHeartData(this.url, this.params);
    }

    getHeartData(url, params) {
        this.http.getTableData(url, params).then(data => {
            if (data['status'] == 'ok') {
                this.data = data['data'];
                this.pagination = data['pagination'];
            } else {
                const toastCfg = new ToastConfig(ToastType.ERROR, '', data['message'], 3000);
                this.toastService.toast(toastCfg);
            }
        }).catch(err => {
            const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
            this.toastService.toast(toastCfg);
        });
    }


}
