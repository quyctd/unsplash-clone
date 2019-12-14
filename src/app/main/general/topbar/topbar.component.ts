import { Component, OnInit } from '@angular/core';
import { HelpersService } from 'src/app/services/helpers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  constructor(
    private helper: HelpersService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  get isLogin() {
    if (this.helper.token !== null) { return true; } else { return false; }
  }
}
