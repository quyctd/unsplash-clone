import { HomeService } from './../../../services/home/home.service';
import { Component, OnInit } from '@angular/core';
import { HelpersService } from 'src/app/services/helpers.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  currentUser: any;
  sForm: FormGroup;

  constructor(
    private helper: HelpersService,
    private router: Router,
    private api: HomeService,
    private fbuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.currentUser = this.helper.currentUser;
    this.sForm = this.fbuilder.group({
      query: new FormControl('')
    });
  }

  get isLogin() {
    if (this.helper.token !== null) { return true; } else { return false; }
  }

  search() {
    let query = this.sForm.get('query').value;
    query = decodeURI(query);
    if (query) {
      this.router.navigateByUrl('/s/photos/' + query);
    }
  }
}
