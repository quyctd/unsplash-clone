import { Component, OnInit, Input } from '@angular/core';
import { HelpersService } from 'src/app/services/helpers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit {

  @Input() user: any;

  constructor(
    private helper: HelpersService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  getImgUrl(item) {
    // tslint:disable-next-line: max-line-length
    if (item) { return this.helper.getImgUrl(item.cloudinary_ver, item.cloudinary_id, item.format); } else { return ''; }
  }

  doFollow() {
    if (!this.helper.token) {
      this.router.navigateByUrl('/join');
    }
  }
}
