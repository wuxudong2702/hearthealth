import {Injectable} from '@angular/core';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmComponent} from './confirm.component';
import {AlertComponent} from './alert.component';
import {ConfirmConfig, AlertConfig, SetConfig} from './modal-model';

import {SetComponent} from './set.component';

//自己加的设置模态框

/**
 * 模块框服务
 */
@Injectable()
export class ModalService {

  constructor(private modalService: NgbModal) {
  }


  //设置确认框
  set (config: SetConfig): Promise<any> {
    const modalRef = this.modalService.open(SetComponent);
    modalRef.componentInstance.config = config;
    return modalRef.result;
  }

  //确认框
  confirm(config: ConfirmConfig): Promise<any> {
    const modalRef = this.modalService.open(ConfirmComponent);
    modalRef.componentInstance.config = config;
    return modalRef.result;
  }

  //警告框
  alert(config: AlertConfig): Promise<any> {
    const modalRef = this.modalService.open(AlertComponent);
    modalRef.componentInstance.config = config;
    return modalRef.result;
  }

}
