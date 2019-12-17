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
    if (this.item && this.item.exif && this.item.exif.camera_maker) { return this.item.exif.camera_maker; } else { return '--'; }
  }

  get cameraModel() {
    if (this.item && this.item.exif && this.item.exif.camera_model) { return this.item.exif.camera_model; } else { return '--'; }
  }

  get ISO() {
    if (this.item && this.item.exif && this.item.exif.iso) { return this.item.exif.iso; } else { return '--'; }
  }

  get focusLength() {
    if (this.item && this.item.exif && this.item.exif.focus_length) { return this.item.exif.focus_length; } else { return '--'; }
  }
  
  get ApertureValue() {
    if (this.item && this.item.exif && this.item.exif.aperture) { return this.item.exif.aperture; } else { return '--'; }
  }
  
  get ShutterSpeedValue() {
    if (this.item && this.item.exif && this.item.exif.shutter_speed) { return this.item.exif.shutter_speed; } else { return '--'; }
  }

  get dimension() {
    if (this.item) { return this.item.width + ' × ' + this.item.height; } else { return '--'; }
  }
}
