import {Component, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import {cell, SortDirection, sortObj, searchObj, DataType} from '../../../shared/table/table-list.component';
import {ApiService} from '../../../business-service/api/api.service';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'app-ecgd',
    templateUrl: './ecgd.component.html',
    styleUrls: ['./ecgd.component.css'],
    providers: []
})


export class EcgdComponent implements OnInit {

    constructor(private cdr: ChangeDetectorRef, private http: ApiService) {

    }

    ngOnInit(): void {
        this.http.getEcgd().then(data => {
            this.headers = data['headers'];
        });
        this.http.getEcgdData().then(data => {
            this.data = data['data'];
        });

    }

    headers: Array<cell> = [];
    data: Array<any>[];
    result: Array<any> = [];
    dataChart: Array<any> = [];
    dataChart1: Array<any> = [];

    userInfoChart: object;

    del: boolean = this.http.isHavePerm('ecgd-del');

    deleteBtn: boolean = this.del;
    deleteAllBtn: boolean = this.del;

    downloadBtn: boolean = true;
    searchBtn: boolean = true;
    detailsBtn: boolean = true;
    setBtn: boolean = true;
    chartBtn: boolean = true;
    paginationBtn: boolean = true;
    setOperate: boolean = true;
    showChartView: boolean = false;
    // searchValue: string = '';
    // selectValue: string = '';

    onChart(chartId: number) {
        // console.log('chartId',chartId, dataChart[chartId]);
        this.http.getEcgdDataChart().then(data => {
            this.dataChart = data['dataChart'];
            this.dataChart1 = this.dataChart[chartId];
            this.userInfoChart = this.data[chartId];
            this.showChartView = !this.showChartView;
        });
    }

    onSort(sort: sortObj) {
        console.log(sort, '3456789');
        this.http.postEcgdSort(sort.id, sort.order).then(data => {
            // console.log(data,'data90098980980');
            this.data = data['data'];
        });
    }


    onSearch(searchObj: searchObj) {
        console.log(searchObj, 'ecgd Search searchObj');
        // this.selectValue = searchObj.selectValue;
        // this.searchValue = searchObj.searchValue;
        this.http.postEcgdSearch(searchObj.selectValue, searchObj.searchValue).then(data => {
            console.log(data, 'ecgd Search result');
            this.data = data['data'];
        });
    }

    onUpload() {
        console.log('upload');

    }
}
