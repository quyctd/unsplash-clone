import { HomeService } from './../../../services/home/home.service';
import { Component, OnInit } from '@angular/core';
import { HelpersService } from 'src/app/services/helpers.service';

@Component({
  selector: 'app-photogrids',
  templateUrl: './photogrids.component.html',
  styleUrls: ['./photogrids.component.scss']
})
export class PhotogridsComponent implements OnInit {
  items = [];
  list1 = [];
  list2 = [];
  list3 = [];

  constructor(
    private helper: HelpersService,
    private api: HomeService
  ) { }

  ngOnInit() {
    this.getEndlessItem();
  }

  getEndlessItem = () => {
    this.api.getEndlessItem().subscribe(
      data => {
        console.log(data);
        this.items = data.body;
        this.updateListItem();
      },
      error => {
        console.log(error);
      }
    );
  }

  updateListItem() {
    this.list1 = [];
    this.list2 = [];
    this.list3 = [];
    for (let i = 0; i < this.items.length; i++) {
      if (i % 3 === 0) { this.list1.push(this.items[i]); }
      if (i % 3 === 1) { this.list2.push(this.items[i]); }
      if (i % 3 === 2) { this.list3.push(this.items[i]); }
    }
  }
}
