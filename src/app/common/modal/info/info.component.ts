import { Component, OnInit, Input } from '@angular/core';
import { HelpersService } from 'src/app/services/helpers.service';

@Component({
  selector: 'app-modal-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  @Input() item: any;

  constructor(
    private helper: HelpersService
  ) { }

  ngOnInit() {
  }

  get imgUrl() {
    // tslint:disable-next-line: max-line-length
    if (this.item) { return this.helper.getImgUrl(this.item.cloudinary_ver, this.item.cloudinary_id, this.item.format); } else { return ''; }
  }
}
