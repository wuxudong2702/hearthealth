import {Injectable, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {cell} from '../table-list.component';


@Injectable()
export class FormControlService {
  constructor() {
  }

  toFormGroup(headers: Array<cell>) {
    let group: any = {};
    // let a=this.headers[0].key;

    headers.forEach(header => {
      // console.log('header.required', header.required);
      group[header.key] = header.required ? new FormControl(header.val || '', [Validators.pattern(header.pattern), Validators.required])
        : new FormControl(header.val || '');
    });
    return new FormGroup(group);
  }
}



