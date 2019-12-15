import { Component, OnInit, Input } from '@angular/core';
import { HelpersService } from 'src/app/services/helpers.service';

@Component({
  selector: 'app-photogrids',
  templateUrl: './photogrids.component.html',
  styleUrls: ['./photogrids.component.scss']
})
export class PhotogridsComponent implements OnInit {
  // tslint:disable-next-line: variable-name
  private _items = [];
  showModal = false;
  modalItem: any;

  get items(): any {
    return this._items;
  }

  @Input()
  set items(val: any) {
    if (val !== undefined) {
      this._items = val;
      this.updateListItem();
    }
  }
  list1 = [];
  list2 = [];
  list3 = [];

  constructor(
    private helper: HelpersService,
  ) { }

  ngOnInit() {
  }

  updateListItem() {
    this.list1 = [];
    this.list2 = [];
    this.list3 = [];
    if (this.items) {
      for (let i = 0; i < this.items.length; i++) {
        if (i % 3 === 0) { this.list1.push(this.items[i]); }
        if (i % 3 === 1) { this.list2.push(this.items[i]); }
        if (i % 3 === 2) { this.list3.push(this.items[i]); }
      }
    }
  }

  showCollectionModal(item) {
    this.showModal = true;
    this.modalItem = item;
  }
}
