import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  items = [];

  constructor(
    private api: HomeService
  ) { }

  ngOnInit() {
    this.getEndlessItem();
  }

  getEndlessItem = () => {
    this.api.getEndlessItem().subscribe(
      data => {
        console.log(data);
        this.items = data.body;
      },
      error => {
        console.log(error);
      }
    );
  }
}
