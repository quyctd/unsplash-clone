import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() showCollectionModal = new EventEmitter();

  constructor(
    private helper: HelpersService,
    private api: HomeService,
    private router: Router
  ) { }

  ngOnInit() {
    // console.log('Item: ', this.item);
  }

  get itemLikeMaps() {
    if (this.item && this.item.item_like_maps) { return this.item.item_like_maps; } else { return []; }
  }

  get imgUrl() {
    if (this.item) { return this.helper.getImgUrl(this.item.cloudinary_ver, this.item.cloudinary_id, this.item.format); }
  }

  get itemPadding() {
    if (this.item) { return this.item.height / this.item.width * 100; } else { return 0; }
  }

  get isLikedByCurrentUser() {
    if (!this.helper.currentUser) { return false; }
    for (const map of this.itemLikeMaps) {
      if (map.user_id === this.helper.currentUser.id && map.liked_flag) {
        return true;
      }
    }
    return false;
  }

  get isInUserCollection() {
    const itemClts = this.item.collections;
    if (!this.helper.currentUser) { return false; }
    for (const clt of this.helper.userCollections) {
      if (itemClts.includes(clt.id)) {
        return true;
      }
    }
    return false;
  }

  doLikeItem(itemId) {
    this.api.likePhoto(itemId, this.helper.currentUser.id).subscribe(
      data => {
        this.item = data;
      },
      error => {
        console.log(error);
        this.router.navigateByUrl('/500');
      }
    );
  }

  _showCollectionModal() {
    this.showCollectionModal.emit(this.item);
  }
}
