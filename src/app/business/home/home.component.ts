import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ApiService} from '../../business-service/api/api.service';
import 'rxjs/add/operator/toPromise';
import  { ModalService } from '../../shared/modal/modal.service';
import { TodoObjData, NeedReadObjData, NoticeObjData, CommonFuncData } from '../home/home-model';
import  { PasswordEditComponent} from '../../business-shared/user/password-edit.component';

@Component({
    selector: 'c-home',
    templateUrl: './home.component.html',
    styleUrls:['./home.component.scss'],
    providers:[ApiService]
})
export class HomeComponent implements OnInit {

    dataChart: Array<any> = [];
    dateList: Array<any> = [];
    valueList: Array<any> = [];
    chartOption: object = {};
    constructor(private http: ApiService){
    }

    ngOnInit() {
        this.http.getHomeDataChart().then(data => {
            this.dataChart = data['dataChart'];
            this.dateList = this.dataChart.map(function (item) {
                return item[0];
            });
            this.valueList = this.dataChart.map(function (item) {
                return item[1];
            });
            this.chartOption = {
                color: ['#3aafdb'],
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {
                        type : 'shadow',
                        shadowStyle:{
                            color:'rgba(224,224,224,0.3)'
                        }
                    }
                },
                grid: {
                    left: '8%',
                    right: '10%',
                    top: '30%',
                    containLabel: true,
                },
                xAxis : [
                    {
                        type : 'category',
                        data : this.dateList,
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        // splitLine:{show: false}
                    }
                ],
                series : [
                    {
                        type:'bar',
                        barWidth: '50%',
                        data:this.valueList
                    }
                ]
            };
        });
    }
}
