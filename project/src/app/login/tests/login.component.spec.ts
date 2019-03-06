import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatTooltipModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '../login.component';
import { RouterModule, Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
          BrowserModule,
          BrowserAnimationsModule,
          MatProgressSpinnerModule,
          MatCardModule,
          ReactiveFormsModule,
          MatFormFieldModule,
          MatIconModule,
          MatInputModule,
          MatTooltipModule
      ],
      providers: [
          { provide: Router, useValue: '' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call generateFormLogin', () => {
    const generateForm = spyOn(component, 'generateFormLogin');
    component.ngOnInit();
    expect(generateForm).toHaveBeenCalled();
    expect(document.title).toEqual('OrganizYou | Login');
  });

  it('should generate Form Login', () => {
    component.generateFormLogin();
    expect(component.loginForm.contains('user')).toBeTruthy();
    expect(component.loginForm.contains('password')).toBeTruthy();
  });
});
