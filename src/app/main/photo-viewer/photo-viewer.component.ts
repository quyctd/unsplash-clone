import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home/home.service';

@Component({
  selector: 'app-photo-viewer',
  templateUrl: './photo-viewer.component.html',
  styleUrls: ['./photo-viewer.component.scss']
})
export class PhotoViewerComponent implements OnInit {

  photoId: string;
  item: any;

  constructor(
    private route: ActivatedRoute,
    private api: HomeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.photoId = this.route.snapshot.paramMap.get('id');
    this.getPhotoInfo();
  }

  getPhotoInfo() {
    this.api.getPhotoInfo(this.photoId).subscribe(
      data => {
        console.log(data);
        this.item = data;
      },
      error => {
        console.log(error);
        this.router.navigateByUrl('/400');
      }
    );
  }
}
