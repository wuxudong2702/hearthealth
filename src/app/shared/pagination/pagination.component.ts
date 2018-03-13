import {Component, Input, Output, OnChanges, SimpleChanges, EventEmitter, OnInit} from '@angular/core';

import {PaginationType, PaginationOptions} from './pagination-model';

import {paginationObj} from '../table/table-list.component';


/**
 * 分页组件
 */
@Component({
  selector: 'c-pagination',
  templateUrl: './pagination.component.html'
})
export class PaginationComponent {

  @Input()
  total: number = 0;

  @Input()
  pageList: Array<number> = [8, 20, 30, 50, 100, 150, 200];

  @Input()
  btnCls: string = 'btn-light';

  @Input() pagination: paginationObj;

  @Output() onPaginationChange = new EventEmitter();

  url: string;

  per_page: string = '8';

  /**
   * 分页改变
   * @param type 操作类型
   */
  pageChanged(type: string) {
    switch (type) {
      case PaginationType.NEXT_PAGE:
        this.onPaginationChange.emit({
          url: this.url,
          per_page: this.per_page,
          page: ++ this.pagination.current_page
        });
        break;

      case PaginationType.PREVIOUS_PAGE:
        this.onPaginationChange.emit({
          url: this.url,
          per_page: this.per_page,
          page: -- this.pagination.current_page
        });
        break;

      case PaginationType.FRIST_PAGE:
        this.onPaginationChange.emit({
          url: this.url,
          per_page: this.per_page,
          page: 1  });
        break;

      case PaginationType.LAST_PAGE:
        this.onPaginationChange.emit({
          url: this.url,
          per_page: this.per_page,
          page: this.pagination.last_page });
        break;
    }
  }
}
