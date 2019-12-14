import { Component, OnInit } from '@angular/core';
import { HelpersService } from 'src/app/services/helpers.service';
import { HomeService } from 'src/app/services/home/home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss']
})
export class FollowingComponent implements OnInit {

  items = [];

  constructor(
    private helper: HelpersService,
    private api: HomeService,
    private router: Router
  ) { }

  ngOnInit() {
    if (!this.userToken) {
      this.router.navigateByUrl('/404');
    }
    this.getFollowingItem();
  }

  get userToken() {
    return this.helper.token;
  }

  getFollowingItem() {
    this.api.getFollowingItem(this.helper.currentUser.id).subscribe(
      data => {
        console.log(data);
        this.items = data.body.items;
      },
      error => {
        console.log(error);
        this.router.navigateByUrl('/500');
      }
    );
  }
}
