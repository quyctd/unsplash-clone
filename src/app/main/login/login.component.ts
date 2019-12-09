import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  // fbuilder: FormBuilder;
  // api = LoginService;

  constructor(
    private fbuilder: FormBuilder,
    private api: LoginService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fbuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  login() {
    const formData = {
      email: this.email.value,
      password: this.password.value
    };
    this.api.login(formData).subscribe(
      data => {
        localStorage.setItem('utoken', JSON.stringify({token: data.body.user.authentication_token }));
        this.router.navigateByUrl('/');
      },
      error => {
        console.log('Login error');
      }
    );
  }
}
