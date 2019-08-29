import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { User } from './user';
import { ValidationTypes } from './validation-types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public isDisplay = false;

  public validationTypes: any = ValidationTypes;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    document.title = 'OrganizYou | Login';
    this.generateFormLogin();
  }

  public generateFormLogin(): void {
    this.loginForm = new FormBuilder().group({
      user: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
}
