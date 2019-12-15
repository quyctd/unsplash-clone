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

  getUserInfo() {
    this.api.userInfo(this.username).subscribe(
      data => {
        this.userdata = data.body;
      },
      error => {
        console.log(error);
        this.router.navigateByUrl('/');
      }
    );
  }
}
