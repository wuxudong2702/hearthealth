import {Component, Input, OnInit} from '@angular/core';
import {cell} from "../../table-list.component";
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-input-edit',
  templateUrl: './input-edit.component.html',
  styleUrls: ['./input-edit.component.css']
})
export class InputEditComponent implements OnInit {

  @Input() field: cell;
  @Input() form: FormGroup;
  @Input() editId: number;
  @Input() data: Array<any>;

  get isValid() {
    return this.form.controls[this.field.key].valid;
  }

  get isDirty(){
    return this.form.controls[this.field.key].dirty;
  }

  constructor() {
  }

  ngOnInit() {
    // console.log(this.data[this.editId]);
  }


  datePickerConfig = {
    locale: 'zh-CN'
  };

}
