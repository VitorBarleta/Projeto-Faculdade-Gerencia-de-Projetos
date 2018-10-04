import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { User } from './user';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  public user: User = new User();

  public isHide = false;

  public passwordOption: string = 'password';

  public passwordIcon: string = 'visibility_off';

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService) { }

  ngOnInit() {
    document.title = 'OrganizYou | Login';
    this.generateFormLogin();
  }

  public generateFormLogin(): void {
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.email, Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.loginForm.valueChanges.subscribe(value => {
      this.user.user = value.login;
      this.user.password = value.password;
    });
  }

  public visibilityPassword(): void {
    if (!this.isHide)
      this.isHide = true;

    else
      this.isHide = false;

    if (this.isHide) {
      this.passwordIcon = 'visibility';
      this.passwordOption = 'text';
    }

    else {
      this.passwordIcon = 'visibility_off';
      this.passwordOption = 'password';
    }
  }

  public LogOn(): void {
    this.auth.doLogin(this.user);
  }
}
