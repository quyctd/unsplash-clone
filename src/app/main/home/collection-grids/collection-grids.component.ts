import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-collection-grids',
  templateUrl: './collection-grids.component.html',
  styleUrls: ['./collection-grids.component.scss']
})
export class CollectionGridsComponent implements OnInit {

  @Input() clts = [];

  constructor() { }

  ngOnInit() {
  }

}
