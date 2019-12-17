import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HelpersService } from 'src/app/services/helpers.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() item: any;
  @Input() modalType: string;
  @Input() type: string;
  @Output() eventHideModal = new EventEmitter();
  @Output() viewerHideModal = new EventEmitter();

  constructor(
    private helper: HelpersService
  ) { }

  ngOnInit() {
  }

  _hideModal() {
    if (this.item) {
      if (this.type === 'grids') {
        this.eventHideModal.emit();
      } else {
        this.viewerHideModal.emit();
      }
      this.item = null;
    }
  }

  get isShowModal() {
    if (this.item) {
      return true;
    } else { return false; }
  }
}
