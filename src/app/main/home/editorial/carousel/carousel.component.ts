import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../../../services/home/home.service';
import { HelpersService } from 'src/app/services/helpers.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  item: any;
  sForm: FormGroup;

  constructor(
    private helper: HelpersService,
    private api: HomeService,
    private router: Router,
    private fbuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.sForm = this.fbuilder.group({
      query: new FormControl('')
    });
    this.initItem();
    this.getThumbnail();
  }

  initItem() {
    this.item = {};
    this.item['username'] = '';
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
    if (this.item) {
      return this.helper.getImgUrl(this.item.cloudinary_ver, this.item.cloudinary_id, this.item.format);
    }
  }

  search() {
    const query = this.sForm.get('query').value;
    if (query) {
      this.router.navigateByUrl('/s/photos/' + query);
    }
  }
}
