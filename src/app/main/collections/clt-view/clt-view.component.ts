import { Component, OnInit } from '@angular/core';
import { HelpersService } from 'src/app/services/helpers.service';
import { CollectionsService } from 'src/app/services/collections/collections.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clt-view',
  templateUrl: './clt-view.component.html',
  styleUrls: ['./clt-view.component.scss']
})
export class CltViewComponent implements OnInit {

  cltId: any;
  clt: any;
  cltItems = [];
  photoMapping:
      {[k: string]: string} = {'=0': 'photos', '=1': 'photo', other: 'photos'};

  constructor(
    private helper: HelpersService,
    private api: CollectionsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.clt = {};
    this.cltId = this.route.snapshot.paramMap.get('id');
    this.getCollectionInfo();
  }

  isPrivate() {
    return false;
  }

  getImgUrl(item) {
    if (item) { return this.helper.getImgUrl(item.cloudinary_ver, item.cloudinary_id, item.format); } else { return ''; }
  }

  getCollectionInfo() {
    this.api.cltInfo(this.cltId).subscribe(
      data => {
        console.log(data);
        this.clt = data.body.clt;
        this.cltItems = data.body.items;
      },
      error => {
        console.log(error);
        this.router.navigateByUrl('/500');
      }
    );
  }

}
