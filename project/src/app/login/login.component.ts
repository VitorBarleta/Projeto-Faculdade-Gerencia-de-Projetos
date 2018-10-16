import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  public isHide = false;

  public Action: string = 'Entrar';

  public passwordOption: string = 'password';

  public passwordIcon: string = 'visibility_off';

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.generateFormLogin();
  }

  public generateFormLogin(): void {
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.email, Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  public visibilityPassword(): void {
    if (!this.isHide)
      this.isHide = true;

    else
      this.isHide = false;

    if (this.isHide){
      this.passwordIcon = 'visibility';
      this.passwordOption = 'text';
    }

    else {
      this.passwordIcon = 'visibility_off';
      this.passwordOption = 'password';
    }
  }

}
