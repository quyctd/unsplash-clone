import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit {

  @Input()
  var: string;

  constructor() { }

  ngOnInit() {
    console.log(this.var);
  }

  isOk() {
    // tslint:disable:curly
    if (this.var === 'y') {
      return true;
    } else return false;
  }
}
