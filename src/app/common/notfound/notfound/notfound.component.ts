import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotfoundComponent implements OnInit {

  id = 1;

  constructor() { }

  ngOnInit() {
    this.id = Math.floor(Math.random() * (16 - 1 + 1)) + 1;
  }

}
