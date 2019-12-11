import { Component, OnInit, Input } from '@angular/core';
import { HelpersService } from 'src/app/services/helpers.service';

@Component({
  selector: 'app-basic-figure',
  templateUrl: './basic-figure.component.html',
  styleUrls: ['./basic-figure.component.scss']
})
export class BasicFigureComponent implements OnInit {

  @Input() item: any;

  constructor(
    private helper: HelpersService
  ) { }

  ngOnInit() {
    // console.log('Item: ', this.item);
  }

  get imgUrl() {
    if (this.item) { return this.helper.getImgUrl(this.item.cloudinary_ver, this.item.cloudinary_id, this.item.format); }
  }

  get itemPadding() {
    if (this.item) { return this.item.height / this.item.width * 100; } else { return 0; }
  }
}
