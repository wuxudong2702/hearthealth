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
    // console.log('table-add-input-get()valid',this.form.controls[this.field.key].valid);
    return this.form.controls[this.field.key].valid;  }
  constructor() { }

  ngOnInit() {}
  onBlur(){

  }
  datePickerConfig = {
    locale: 'zh-CN'
  };

}
