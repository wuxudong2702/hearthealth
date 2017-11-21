import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ApiService} from '../../business-service/api/api.service';
import 'rxjs/add/operator/toPromise';
import  { ModalService } from '../../shared/modal/modal.service';
import { TodoObjData, NeedReadObjData, NoticeObjData, CommonFuncData } from '../home/home-model';
import  { PasswordEditComponent} from '../../business-shared/user/password-edit.component';
import 'rxjs/add/operator/toPromise';
import {ToastService} from '../../shared/toast/toast.service';
import {ToastConfig, ToastType} from '../../shared/toast/toast-model';

@Component({
    selector: 'c-home',
    templateUrl: './home.component.html',
    styleUrls:['./home.component.scss'],
    providers:[ApiService]
})
export class HomeComponent implements OnInit {

    dataChart: Array<any> = [];
    dataList: Array<any> = [];
    valueList: Array<any> = [];
    chartOption: object = {};
    constructor(private http: ApiService,private toastService: ToastService){
    }

    ngOnInit() {
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
                        data : this.dataList,
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
        this.http.homeData().then(data => {
            if (data['status'] == 'ok') {
                this.valueList = Object.keys(data['data']);
                this.dataList = Object.values(data['data']);

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
}
