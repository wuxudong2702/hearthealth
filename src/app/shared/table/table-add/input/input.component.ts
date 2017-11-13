import {Component, Input, OnInit} from '@angular/core';
import {cell} from "../../table-list.component";
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Input() field: cell;
  @Input() form: FormGroup;

  get isValid() {
    return this.form.controls[this.field.key].valid;
  }

  get isDirty(){
    return this.form.controls[this.field.key].dirty;
  }

  constructor() {
  }

  ngOnInit() {
    // console.log('add and edit field ',this.field)
  }


  datePickerConfig = {
    locale: 'zh-CN'
  };

}
