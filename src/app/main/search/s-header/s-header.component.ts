import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-s-header',
  templateUrl: './s-header.component.html',
  styleUrls: ['./s-header.component.scss']
})
export class SHeaderComponent implements OnInit {

  @Input() query: string;

  constructor() { }

  ngOnInit() {
  }

}
