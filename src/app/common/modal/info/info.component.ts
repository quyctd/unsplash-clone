import { Component, OnInit, Input } from '@angular/core';
import { HelpersService } from 'src/app/services/helpers.service';

@Component({
  selector: 'app-modal-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  @Input() item: any;

  constructor(
    private helper: HelpersService
  ) { }

  ngOnInit() {
  }

  get imgUrl() {
    // tslint:disable-next-line: max-line-length
    if (this.item) { return this.helper.getImgUrl(this.item.cloudinary_ver, this.item.cloudinary_id, this.item.format); } else { return ''; }
  }

  get cameraMake() {
    if (this.item && this.item.exif.Make) { return this.item.exif.Make; } else { return '--'; }
  }

  get cameraModel() {
    if (this.item && this.item.exif.Model) { return this.item.exif.Model; } else { return '--'; }
  }

  get ISO() {
    if (this.item && this.item.exif.ISOSpeedRatings) { return this.item.exif.ISOSpeedRatings; } else { return '--'; }
  }

  get focusLength() {
    if (this.item && this.item.exif.FocalLength) { return this.item.exif.FocalLength; } else { return '--'; }
  }
  
  get ApertureValue() {
    if (this.item && this.item.exif.ApertureValue) { return this.item.exif.ApertureValue; } else { return '--'; }
  }
  
  get ShutterSpeedValue() {
    if (this.item && this.item.exif.ShutterSpeedValue) { return this.item.exif.ShutterSpeedValue; } else { return '--'; }
  }

  get dimension() {
    if (this.item) { return this.item.width + ' × ' + this.item.height; } else { return '--'; }
  }
}
