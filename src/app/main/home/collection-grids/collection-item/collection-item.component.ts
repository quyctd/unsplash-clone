import { Component, OnInit, Input } from '@angular/core';
import { HelpersService } from 'src/app/services/helpers.service';

@Component({
  selector: 'app-collection-item',
  templateUrl: './collection-item.component.html',
  styleUrls: ['./collection-item.component.scss']
})
export class CollectionItemComponent implements OnInit {

  @Input() clt: any;
  photoMapping:
      {[k: string]: string} = {'=0': 'photos', '=1': 'photo', other: 'photos'};

  constructor(
    private helper: HelpersService
  ) { }

  ngOnInit() {
  }

  isPrivate() {
    return this.clt.status;
  }

  getImgUrl(item) {
    if (item) { return this.helper.getImgUrl(item.cloudinary_ver, item.cloudinary_id, item.format); } else { return ''; }
  }
}
