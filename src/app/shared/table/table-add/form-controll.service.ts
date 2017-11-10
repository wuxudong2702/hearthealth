import { Injectable ,Input}   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {cell} from '../table-list.component';


@Injectable()
export class FormControlService {
  constructor() { }

  toFormGroup(headers: Array<cell> ) {
    let group: any = {};
    // let a=this.headers[0].key;
    headers.forEach(header => {
      group[header.key] = header.required ? new FormControl(header.val || '', Validators.required)
        : new FormControl(header.val || '');
    });
    return new FormGroup(group);
  }
}



