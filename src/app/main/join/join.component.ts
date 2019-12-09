import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { JoinService } from 'src/app/services/auth/join.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fbuilder: FormBuilder,
    private api: JoinService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.fbuilder.group({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
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
        localStorage.setItem('utoken', JSON.stringify({token: data.data.user.authentication_token }));
        const tokenHash = JSON.parse(localStorage.getItem('utoken'));
        console.log('HELPER: ', tokenHash);
        this.router.navigateByUrl('/');
      },
      error => {
        console.log('Register error: ', error, error.body);
      },
      () => {
        console.log();
      }
    );
  }

}
