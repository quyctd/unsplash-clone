import { Component, OnInit, Input } from '@angular/core';
import { HelpersService } from 'src/app/services/helpers.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CollectionsService } from 'src/app/services/collections/collections.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

  @Input() item: any;
  createClt = false;
  clickCreate = false;
  form: FormGroup;
  userCollections: any;

  constructor(
    private helper: HelpersService,
    private fbuilder: FormBuilder,
    private api: CollectionsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.fbuilder.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      isPrivate: new FormControl(false)
    });
    this.getUserCollections();
  }

  getImgUrl(item) {
    // tslint:disable-next-line: max-line-length
    if (item) { return this.helper.getImgUrl(item.cloudinary_ver, item.cloudinary_id, item.format); } else { return ''; }
  }

  getUserCollections() {
    this.api.userClt({user_id: this.helper.currentUser.id}).subscribe(
      data => {
        this.userCollections = data;
      },
      error => {
        console.log(error);
        this.router.navigateByUrl('/500');
      }
    );
  }

  get userId() {
    return this.helper.currentUser.id;
  }

  showCreateClt() {
    this.createClt = true;
  }

  cancelCreateClt() {
    this.createClt = false;
  }

  doCreateClt() {
    this.clickCreate = true;
    const formData = {
      name: this.form.get('name').value,
      describe: this.form.get('description').value,
      status: this.form.get('isPrivate').value,
      user_id: this.userId
    };
    this.api.createNewClt(formData).subscribe(
      data => {
        this.userCollections = data.body.user.collections;
        this.cancelCreateClt();
      },
      error => {
        console.log(error);
        this.router.navigateByUrl('/500');
      }
    );
  }

  get createCltText() {
    if (this.clickCreate) { return '...'; } else { return 'Create collection'; }
  }

  isInThisClt(index) {
    const clt = this.userCollections[index];
    for (const itemId of clt.item_ids) {
      if (itemId === this.item.id) {
        return true;
      }
    }
    return false;
  }

  doToggleCollection(index) {
    const clt = this.userCollections[index];
    const body = {
      item_id: this.item.id,
      collection_id: clt.id,
      user_id: this.helper.currentUser.id
    };
    if (this.isInThisClt(index)) {
      this.api.remove(body).subscribe(
        data => {
          this.userCollections = data;
          this.cancelCreateClt();
        },
        error => {
          console.log(error);
          this.router.navigateByUrl('/500');
        }
      );
    } else {
      this.api.add(body).subscribe(
        data => {
          this.userCollections = data;
          this.cancelCreateClt();
        },
        error => {
          console.log(error);
          this.router.navigateByUrl('/500');
        }
      );
    }
  }
}
