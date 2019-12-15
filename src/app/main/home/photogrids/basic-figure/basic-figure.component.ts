import { Component, OnInit, Input } from '@angular/core';
import { HelpersService } from 'src/app/services/helpers.service';
import { HomeService } from 'src/app/services/home/home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basic-figure',
  templateUrl: './basic-figure.component.html',
  styleUrls: ['./basic-figure.component.scss']
})
export class BasicFigureComponent implements OnInit {

  @Input() item: any;
  likeResult: any;

  constructor(
    private helper: HelpersService,
    private api: HomeService,
    private router: Router
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

  doLikeItem(itemId) {
    this.api.likePhoto(itemId, this.helper.currentUser.id).subscribe(
      data => {
        console.log(data);
        this.likeResult = data.body;
      },
      error => {
        console.log(error);
        this.router.navigateByUrl('/500');
      }
    );
  }
}
