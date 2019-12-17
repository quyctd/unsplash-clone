import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { JoinService } from 'src/app/services/auth/join.service';
import { Router } from '@angular/router';
import { HelpersService } from 'src/app/services/helpers.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {

  form: FormGroup;
  joinPhoto: any;

  constructor(
    private fbuilder: FormBuilder,
    private api: JoinService,
    private router: Router,
    private helper: HelpersService,
    private sanitization: DomSanitizer
  ) { }

  ngOnInit() {
    this.joinPhoto = {
      cloudinary_ver: undefined,
      cloudinary_id: undefined,
      format: undefined,
      created_at: Date(),
      width: 0,
      height: 0,
      username: ''
    };
    this.form = this.fbuilder.group({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
    this.getJoinPhoto();
  }

  get first_name() {
    return this.form.get('first_name');
  }

  get last_name() {
    return this.form.get('last_name');
  }

  get username() {
    return this.form.get('username');
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  register() {
    const formData = {
      first_name: this.first_name.value,
      last_name: this.last_name.value,
      username: this.username.value,
      email: this.email.value,
      password: this.password.value
    };

    console.log(formData);

    this.api.register(formData).subscribe(
      data => {
        localStorage.setItem('utoken', JSON.stringify({token: data.body.user.authentication_token }));
        localStorage.setItem('currentUser', JSON.stringify({ user: data.body.user }));
        this.helper.userCollections = this.helper.currentUser.collections;
        this.router.navigateByUrl('/');
      },
      error => {
        console.log('Register error: ', error, error.body);
        this.router.navigateByUrl('/500');
      },
      () => {
        console.log();
      }
    );
  }

  getJoinPhoto() {
    this.api.joinPhoto().subscribe(
      data => {
        this.joinPhoto = data.body;
      },
      error => {
        this.router.navigateByUrl('/');
      }
    );
  }

  get photoUrl() {
    return this.helper.getImgUrl(this.joinPhoto.cloudinary_ver, this.joinPhoto.cloudinary_id, this.joinPhoto.format);
    // return this.sanitization.bypassSecurityTrustStyle(`url(${imgUrl})`);
  }

  get photoUploadDate() {
    return this.helper.dateToText(this.joinPhoto.created_at);
  }
}
