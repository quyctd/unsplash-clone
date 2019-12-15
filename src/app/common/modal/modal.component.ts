import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HelpersService } from 'src/app/services/helpers.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() item: any;
  @Output() eventHideModal = new EventEmitter();

  constructor(
    private helper: HelpersService
  ) { }

  ngOnInit() {
  }

  _hideModal() {
    if (this.item) {
      this.eventHideModal.emit();
    }
  }

  get isShowModal() {
    if (this.item) {
      return true;
    } else { return false; }
  }
}
