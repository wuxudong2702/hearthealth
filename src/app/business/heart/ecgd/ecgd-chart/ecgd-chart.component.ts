import {Component, OnInit, NgModule, Input, Output, EventEmitter,HostListener} from '@angular/core';
import {ToastService} from '../../../../shared/toast/toast.service';
import {ToastConfig, ToastType} from '../../../../shared/toast/toast-model';
import {ApiService} from '../../../../business-service/api/api.service';

@Component({
  selector: 'app-ecgd-chart',
  templateUrl: './ecgd-chart.component.html',
  styleUrls: ['./ecgd-chart.component.scss']
})
export class EcgdChartComponent implements OnInit {

  @Input() dataChart1: Array<any>;
  // @Input() userName: string;
  @Input() userId: string;
  // @Input() sense_time: any;
  @Input() Params: any;

  @Output() back = new EventEmitter<any>();

  dateList: Array<any>;
  valueList: Array<any>;
  chartOption: object = {};
  userInfo:object;
  dataZoomEnd :number = 13;
  chartDetailsData: Array<any>;
  chartDetailsId: number;
  details_none:boolean = false;
  userName: string;
  sense_time: any;
  constructor(private http: ApiService, private toastService: ToastService) {
  }

  ngOnInit() {

    this.valueList=this.dataChart1;
    // console.log(this.valueList.length,'this.valueList.length');
    if(this.valueList.length < 800){
      for(let i = 0;i<800-this.valueList.length;i++){
        this.valueList.push('null');
      }
      this.dataZoomEnd = 100;
    }else if(this.valueList.length >= 800 && this.valueList.length < 2000){
      this.dataZoomEnd = 32;
    }else if(this.valueList.length > 2000 && this.valueList.length <= 5000){
      this.dataZoomEnd = 12;
    }else if(this.valueList.length > 5000 && this.valueList.length <= 8000){
      this.dataZoomEnd = 8;
    }else {
      this.dataZoomEnd = 3;
    }
    this.dateList=this.dataChart1.map(function (item,index) {
        return index+1;
      });
    this.chartOption = {

          animation: false,
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'cross'
              },
              backgroundColor: 'rgba(245, 245, 245, 0.8)',
              borderWidth: 1,
              borderColor: '#ccc',
              padding: 10,
              textStyle: {
                  color: '#000'
              },
              position: function (pos, Params, el, elRect, size) {
                  let obj = {top: 10};
                  obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
                  return obj;
              },
              extraCssText: 'width: 170px'
          },
          axisPointer: {
              link: {xAxisIndex: 'all'},
              label: {
                  backgroundColor: '#ccc'
              }
          },
          grid: [
              {
                  left: '10%',
                  right: '8%',
                  top:'10%',
                  // bottom: 150,
                  height:'60%',
                  borderColor:'#FF6347'
              }
          ],
          xAxis: [
              {
                  type: 'category',
                  data: this.dateList,
                  scale: true,
                  boundaryGap : false,
                  axisLine: {onZero: false},
                  splitLine: {
                      show: true,
                      lineStyle:{
                          color: '#FF6347',
                          width: 0.4,
                          type: 'solid'
                      },
                      interval:4
                  },
                  // splitNumber: 1,
                  // splitArea : {
                  //     show : true,
                  //     areaStyle:{
                  //        color:'#ccc'
                  //     }
                  // },
                  axisLabel: {
                      formatter: function (value, index) {

                          let date = new Date(parseInt(value));
                          let texts = [date.getMinutes(),date.getSeconds(),date.getMilliseconds()];
                          return texts.join(':');
                      }
                  }
              }
          ],
          yAxis: [
              {
                  // type: 'value',
                  name : '单位：mv',
                  // scale: true,
                  // interval:1,
                  // max:80,
                  // min:-80,
                  // max:'dataMax',
                  // min:'dataMin',
                  splitLine: {
                      show:true,
                      lineStyle:{
                      color: '#FF6347',//网格线颜色
                      width: 0.4,//网格线宽度
                      type: 'solid',//网格线样式
                      // interval:1000
                  }},
                  splitNumber:25
                  // axisLabel: {
                  //     // show: false,
                  //     // interval:0.1
                  //     // areaStyle:{
                  //     //     color:'#ccc'
                  //     // }
                  //     // lineHeight:50
                  // },
                  // axisTick: {
                  //     length:5
                  // }
              }
          ],
          dataZoom: [
              {
                  type: 'inside',
                  start: 0,
                  end: this.dataZoomEnd,
                  // minValueSpan: 10
                  top:'80%',

              },
              {
                  show: true,
                  type: 'slider',
                  realtime:true,
                  top:'80%',
                  start: 0,
                  end: this.dataZoomEnd,

                  // minValueSpan: 10
              }
          ],
          series: [
              {
                  type: 'line',
                  hoverAnimation: false,
                  symbol:'none',
                  smooth:false,
                  data: this.valueList,
                  lineStyle : {
                      normal : {
                              color:'#000000'
                      }
                  },
              }
          ]
    }
    this.chartDetailsId = this.Params['id'];
    this.userName = this.Params['name'];
    this.sense_time = this.Params['sense_time'];
    this.http.getHhrDataDetails(''+this.Params['user_id'],''+ this.chartDetailsId).then(data => {
      if (data['status'] == 'ok') {
        if (data['data']) {
          this.chartDetailsData=[];
          for(let i  in data['data'] ){
            let arr=[];
            arr.push(i);
            arr.push(data['data'][i]);
            this.chartDetailsData.push(arr);
          }
          this.chartDetailsData.forEach(function (v) {
            if (v[0] == "n_bpm_code") {
              v[0] = "n_bpm_code(心率结论)";
              switch (v[1]) {
                case '0' :
                  v[1] = "未处理异常";
                  break;
                case '1' :
                  v[1] = "过慢";
                  break;
                case '2' :
                  v[1] = "稍慢";
                  break;
                case '3' :
                  v[1] = "正常";
                  break;
                case '4' :
                  v[1] = "稍快";
                  break;
                case '5' :
                  v[1] = "过快";
                  break;
                case '6' :
                  v[1] = "测量结果异常";
                  break;
                default:
                  v[1] = "";
              }
            }
            if (v[0] == "n_rythm_code") {
              v[0] = "n_rythm_code(节律结论)";
              switch (v[1]) {
                //0未处理异常；1正常；2轻度异常；3中度异常；4明显异常
                case '0' :
                  v[1] = "未处理异常";
                  break;
                case '1' :
                  v[1] = "正常";
                  break;
                case '2' :
                  v[1] = "轻度异常";
                  break;
                case '3' :
                  v[1] = "中度异常";
                  break;
                case '4' :
                  v[1] = "明显异常";
                  break;
                default:
                  v[1] = "";
              }
            }
            if (v[0] == "n_arrhythmia_code" || v[0] == "n_heart_health_code") {
              if(v[0] == "n_arrhythmia_code"){
                v[0] = "n_arrhythmia_code(心律失常解决)";
              }
              if(v[0] == "n_heart_health_code"){
                v[0] = "n_heart_health_code(心脏健康结论)";
              }
              switch (v[1]) {
                case '0' :
                  v[1] = "未处理异常";
                  break;
                case '1' :
                  v[1] = "健康";
                  break;
                case '2' :
                  v[1] = "隐患";
                  break;
                case '3' :
                  v[1] = "风险";
                  break;
                default:
                  v[1] = "";
              }
            }
            if (v[0] == "n_pressure_code") {
              v[0] = "n_pressure_code(压力等级)";
              switch (v[1]) {
                case '0' :
                  v[1] = "未处理异常";
                  break;
                case '1' :
                  v[1] = "较小";
                  break;
                case '2' :
                  v[1] = "较大";
                  break;
                default:
                  v[1] = "";
              }
            }
            if (v[0] == "n_sdnn_zzsjzzl_code" || v[0] == "n_rmssd_xxgtjnl_code" || v[0] == "n_tp_zzsjtjnl_code") {
              if(v[0] == "n_sdnn_zzsjzzl_code"){
                v[0] = "n_sdnn_zzsjzzl_code(自主神经总张力)";
              }
              if(v[0] == "n_rmssd_xxgtjnl_code"){
                v[0] = "n_rmssd_xxgtjnl_code(心血管调节能力)";
              }
              if(v[0] == "n_tp_zzsjtjnl_code"){
                v[0] = "n_tp_zzsjtjnl_code(自主神经调节能力)";
              }
              switch (v[1]) {
                case '0' :
                  v[1] = "未处理异常";
                  break;
                case '1' :
                  v[1] = "正常";
                  break;
                case '2' :
                  v[1] = "异常";
                  break;
                default:
                  v[1] = "";
              }
            }
            if (v[0] == "n_lf_yjfynl_code" || v[0] == "n_hf_hfnl_code") {
              if(v[0] == "n_lf_yjfynl_code"){
                v[0] = "n_lf_yjfynl_code(应激反应能力)";
              }
              if(v[0] == "n_hf_hfnl_code"){
                v[0] = "n_hf_hfnl_code(情绪恢复能力)";
              }
              switch (v[1]) {
                case '0' :
                  v[1] = "未处理异常";
                  break;
                case '1' :
                  v[1] = "弱";
                  break;
                case '2' :
                  v[1] = "中";
                  break;
                case '3' :
                  v[1] = "强";
                  break;
                default:
                  v[1] = "";
              }
            }
            if (v[0] == "n_lfhf_zzsjphx_code") {
              v[0] = "n_lfhf_zzsjphx_code(自主神经平衡性)";
              switch (v[1]) {
                case '0' :
                  v[1] = "未处理异常";
                  break;
                case '1' :
                  v[1] = "交感神经活跃";
                  break;
                case '2' :
                  v[1] = "平衡";
                  break;
                case '3' :
                  v[1] = "副交感神经活跃";
                  break;
                default:
                  v[1] = "";
              }
            }
          });
          this.details_none = false;

        } else {
          this.details_none = true;
        }
      }
    }).catch(err => {
      const toastCfg = new ToastConfig(ToastType.ERROR, '', err, 3000);
      // console.error(err);
      this.toastService.toast(toastCfg);
    });
  }

   chartView(){
     this.back.emit(1);
   }

    @HostListener('window:resize')
    onWindowResize(): void {}
}

