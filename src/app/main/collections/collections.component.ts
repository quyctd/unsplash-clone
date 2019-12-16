import { Component, OnInit } from '@angular/core';
import { HelpersService } from 'src/app/services/helpers.service';
import { Router } from '@angular/router';
import { CollectionsService } from 'src/app/services/collections/collections.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent implements OnInit {

  collections = [];

  constructor(
    private helper: HelpersService,
    private api: CollectionsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAllCollections();
  }

  getAllCollections() {
    this.api.getAllCollections().subscribe(
      data => {
        console.log(data);
        this.collections = data.body;
      },
      error => {
        console.log(error);
        this.router.navigateByUrl('/500');
      }
    );
  }
}
