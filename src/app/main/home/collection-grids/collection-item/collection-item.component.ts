import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-collection-item',
  templateUrl: './collection-item.component.html',
  styleUrls: ['./collection-item.component.scss']
})
export class CollectionItemComponent implements OnInit {

  @Input()
  isLocked = false;

  constructor() { }

  ngOnInit() {
  }

  isPrivate() {
    return this.isLocked;
  }
}
