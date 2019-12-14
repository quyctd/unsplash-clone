import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-action',
  templateUrl: './user-action.component.html',
  styleUrls: ['./user-action.component.scss']
})
export class UserActionComponent implements OnInit {

  @Input() user: any;
  @Input() tab: string;

  constructor() { }

  ngOnInit() {
  }

  get photoNumber() {
    if (this.user && this.user.photos ) {
      return this.user.photos.length;
    } else { return 0; }
  }

  get likeNumber() {
    if (this.user && this.user.likes ) { return this.user.likes.length; } else { return 0; }
  }

  get collectionNumber() {
    if (this.user && this.user.collections ) { return this.user.collections.length; } else { return 0; }
  }

}
