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
  }

  getImgUrl(item) {
    // tslint:disable-next-line: max-line-length
    if (item) { return this.helper.getImgUrl(item.cloudinary_ver, item.cloudinary_id, item.format); } else { return ''; }
  }

  get userCollections() {
    if (this.helper.currentUser) {
      return this.helper.currentUser.collections;
    } else { return []; }
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
        localStorage.setItem('currentUser', JSON.stringify({ user: data.body.user }));
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

  doToggleCollection(index) {
    const clt = this.userCollections[index];
  }
}
