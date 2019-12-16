import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-usergrids',
  templateUrl: './usergrids.component.html',
  styleUrls: ['./usergrids.component.scss']
})
export class UsergridsComponent implements OnInit {

  @Input() users = [];

  constructor() { }

  ngOnInit() {
  }

}
