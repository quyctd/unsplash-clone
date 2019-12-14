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

  constructor(
    private helper: HelpersService,
    private api: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('id');
    this.getUserInfo();
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
