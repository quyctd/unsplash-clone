import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-s-action',
  templateUrl: './s-action.component.html',
  styleUrls: ['./s-action.component.scss']
})
export class SActionComponent implements OnInit {

  @Input() query: string;
  @Input() route: string;

  constructor() { }

  ngOnInit() {
  }

}
