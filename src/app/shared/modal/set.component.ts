import {Component, Input, Output, ViewEncapsulation, EventEmitter, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {SetConfig} from './modal-model';

/**
 * 设置框组件，设置列
 */

@Component({
  selector: 'c-set-confirm',
  templateUrl: './set.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./confirm.component.scss'],
})

export class SetComponent implements OnInit {

  @Input()
  config: SetConfig;

  @Output() onCustomSetColumn = new EventEmitter<any>();

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
    this.headersTemp = JSON.parse(JSON.stringify(this.config.headers));
  }

  headersTemp: Array<any> = [];

  /**
   * 取消
   */
  decline(): void {
    this.activeModal.dismiss({status: 'declined'});
  }

  /**
   * 关闭
   */
  close(): void {
    this.activeModal.dismiss({status: 'closed'});
  }

  /**
   * 确认修改设置列功能
   */
  approve(): void {
    this.activeModal.close({status: 'approved', configHeaders: this.headersTemp});
  }

  customSetColumn(i, show) {
    this.headersTemp[i]['show'] = !this.headersTemp[i]['show'];
  }

  customSetOrder(i, index) {
    if (i === 0) {
      // this.headersTemp[i + 1]['index']--;
      // this.headersTemp[i]['index']++;

      let index= this.headersTemp[0]['index'];
      this.headersTemp[0]['index']=this.headersTemp[1]['index'];
      this.headersTemp[1]['index']=index;

      let temp = this.headersTemp[i + 1];
      this.headersTemp[i + 1] = this.headersTemp[i];
      this.headersTemp[i] = temp;
    }
    if (i > 0) {
      let index= this.headersTemp[i - 1]['index'];
      this.headersTemp[i - 1]['index']=this.headersTemp[i]['index'];
      this.headersTemp[i]['index']=index;

      let temp = this.headersTemp[i - 1];
      this.headersTemp[i - 1] = this.headersTemp[i];
      this.headersTemp[i] = temp;
    }
  }

}
