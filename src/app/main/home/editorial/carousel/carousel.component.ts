import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../../../services/home/home.service';
import { HelpersService } from 'src/app/services/helpers.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  item: any;

  constructor(
    private helper: HelpersService,
    private api: HomeService
  ) {}

  ngOnInit() {
    this.getThumbnail();
  }

  getThumbnail = () => {
    this.api.getHomeThumbnail().subscribe(
      data => {
        console.log(data);
        this.item = data.body;
      },
      error => {
        console.log(error);
      },
      () => {
        console.log();
      }
    );
  }

  get imgUrl() {
    return this.helper.getImgUrl(this.item.cloudinary_ver, this.item.cloudinary_id, this.item.format);
  }

}
