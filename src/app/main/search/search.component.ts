import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelpersService } from 'src/app/services/helpers.service';
import { HomeService } from 'src/app/services/home/home.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  route: any;
  query: string;
  sData: any;

  constructor(
    private router: Router,
    private helper: HelpersService,
    private api: HomeService
  ) { }

  ngOnInit() {
    this.sData = {};
    this.route = this.router.url.split('/')[2];
    this.query = decodeURI(this.router.url.split('/')[3]);
    this.getSearchInfo();
  }

  getSearchInfo() {
    this.api.search(this.query).subscribe(
      data => {
        this.sData = data.body;
      },
      error => {
        console.log(error);
        this.router.navigateByUrl('/500');
      }
    );
  }

}
