import { Component, OnInit, Input } from '@angular/core';
import { HelpersService } from 'src/app/services/helpers.service';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit {

  @Input() user: any;

  constructor(
    private helper: HelpersService,
    private router: Router,
    private api: UsersService
  ) { }

  ngOnInit() {
  }

  get isCurrentUser() {
    if (this.user.id === this.helper.currentUser.id) {
      return true;
    } else { return false; }
  }

  get isFollowing() {
    for (const follow of this.user.follower) {
      if (follow.id === this.helper.currentUser.id) {
        return true;
      }
    }
    return false;
  }

  updateFollowing(val) {
    if (val) {
      this.user.follower.push(this.helper.currentUser);
    } else {
      let index = -1;
      for (let i = 0; i < this.user.follower.length; i++) {
        if (this.helper.currentUser.id === this.user.follower[i].id) {
          index = i;
          break;
        }
      }
      this.user.follower.splice(index, 1);
    }
  }

  getImgUrl(item) {
    // tslint:disable-next-line: max-line-length
    if (item) { return this.helper.getImgUrl(item.cloudinary_ver, item.cloudinary_id, item.format); } else { return ''; }
  }

  doFollow() {
    if (!this.helper.token) {
      this.router.navigateByUrl('/join');
    }
    this.api.doFollow(this.helper.currentUser.id, this.user.username).subscribe(
      data => {
        this.updateFollowing(data.status);
      },
      error => {
        console.log(error);
        this.router.navigateByUrl('/404');
      }
    );
  }

  get followText() {
    if (this.isFollowing) { return 'Following'; } else { return 'Follow'; }
  }

  viewProfile() {
    this.router.navigateByUrl('/user/' + this.helper.currentUser.username);
  }
}
