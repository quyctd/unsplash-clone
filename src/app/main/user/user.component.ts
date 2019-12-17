import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';
import { HelpersService } from 'src/app/services/helpers.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  tab = 'collections';
  username: string;
  userdata: any;
  showAction = false;
  isFollowing = false;

  constructor(
    private helper: HelpersService,
    private api: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.userdata = { full_name: ''};
    this.username = this.route.snapshot.paramMap.get('id');
    const tab = this.router.url.replace('user/', '').replace(this.username, '').replace(/\//g, '');
    if (tab === 'collections') {
      this.tab = tab;
    } else if (tab === 'likes') {
      this.tab = tab;
    } else {
      this.tab = 'photos';
    }
    this.getUserInfo();
  }

  get isCurrentUser() {
    if (!this.helper.currentUser) { return false; }
    if (this.username === this.helper.currentUser.username) {
      return true;
    } else { return false; }
  }

  toggleMoreAction() {
    if (this.isCurrentUser) {
      this.showAction = !this.showAction;
    }
  }

  moreActionClickOutside() {
    this.showAction = false;
  }

  doFollow() {
    if (!this.helper.token) {
      this.router.navigateByUrl('/join');
    }
    this.api.doFollow(this.helper.currentUser.id, this.username).subscribe(
      data => {
        this.isFollowing = data.status;
      },
      error => {
        console.log(error);
        this.router.navigateByUrl('/404');
      }
    );
  }

  get followText() {
    if (this.isFollowing) { return 'Following';} else { return 'Follow'; }
  }

  getUserInfo() {
    const token = this.helper.token ? this.helper.token : 'nil';
    this.api.userInfo(this.username, token).subscribe(
      data => {
        this.userdata = data.body;
        for (const follow of data.body.follower) {
          if (follow.id === this.helper.currentUser.id) {
            this.isFollowing = true;
            break;
          }
        }
      },
      error => {
        console.log(error);
        this.router.navigateByUrl('/');
      }
    );
  }
}
