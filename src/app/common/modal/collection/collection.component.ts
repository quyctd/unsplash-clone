import { Component, OnInit, Input } from '@angular/core';
import { HelpersService } from 'src/app/services/helpers.service';

@Component({
  selector: 'app-modal-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

  @Input() item: any;

  constructor(
    private helper: HelpersService
  ) { }

  ngOnInit() {
  }

  getImgUrl(item) {
    // tslint:disable-next-line: max-line-length
    if (item) { return this.helper.getImgUrl(item.cloudinary_ver, item.cloudinary_id, item.format); } else { return ''; }
  }

  get userCollections() {
    if (this.helper.currentUser) {
      return this.helper.currentUser.collections;
    } else { return []; }
  }
}
