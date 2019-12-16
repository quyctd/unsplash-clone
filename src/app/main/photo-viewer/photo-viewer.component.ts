import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home/home.service';
import { HelpersService } from 'src/app/services/helpers.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-photo-viewer',
  templateUrl: './photo-viewer.component.html',
  styleUrls: ['./photo-viewer.component.scss']
})
export class PhotoViewerComponent implements OnInit {

  photoId: string;
  item: any;
  zoom: boolean;
  isShowModal = false;

  constructor(
    private route: ActivatedRoute,
    private api: HomeService,
    private router: Router,
    private helper: HelpersService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.zoom = false;
    this.item = {
      user: { username: ''}
    };
    this.photoId = this.route.snapshot.paramMap.get('id');
    this.getPhotoInfo();
  }

  getPhotoInfo() {
    this.api.getPhotoInfo(this.photoId).subscribe(
      data => {
        console.log(data);
        this.item = data;
      },
      error => {
        console.log(error);
        this.router.navigateByUrl('/400');
      }
    );
  }

  get itemLikeMaps() {
    if (this.item && this.item.item_like_maps) { return this.item.item_like_maps; } else { return []; }
  }

  get imgUrl() {
    return this.helper.getImgUrl(this.item.cloudinary_ver, this.item.cloudinary_id, this.item.format);
  }

  get downloadUrl() {
    return '/photos/' + this.item.id + '/download?force=true';
  }

  get imgPadding() {
    if (this.item.width && this.item.height) {
      return this.item.height / this.item.width * 100;
    } else { return 1; }
  }

  get maxWidthPercent() {
    return 'calc((100vh - 200px) *' + 100 / this.imgPadding + ')';
  }

  get minWidth() {
    if (this.item.width && this.item.height) {
      if (this.item.width >= this.item.height) { return 500; } else { return 334; }
    } else { return 500; }
  }

  toggleZoom() {
    this.zoom = !this.zoom;
    console.log('toggle: ', this.zoom);
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

  doLikeItem(itemId) {
    if (!this.helper.token) {
      this.router.navigateByUrl('/join');
    }
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
    if (!this.helper.token) {
      this.router.navigateByUrl('/join');
    } else {
      this.isShowModal = true;
    }
  }

  hideModal() {
    this.isShowModal = false;
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

  downloadFile() {
    const link = document.createElement('a');
    link.setAttribute('type', 'hidden');
    link.href = this.imgUrl;
    link.target = '_blank';
    link.click();
  }
}
