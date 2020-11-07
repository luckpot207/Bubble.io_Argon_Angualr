import { AuthService } from './../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  constructor(
    private auth: AuthService,
    private formBuilder : FormBuilder,
    private router : Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
  }
  ngOnDestroy() {
  }
  login(){
    console.log(this.loginForm.value);
    this.auth.login(this.loginForm.value).subscribe(
      (response:any)=>{
        localStorage.setItem('userToken', response.response.token);
        localStorage.setItem('userId', response.response.user_id);
        this.router.navigateByUrl('/dashboard');
      }
    )
  }
}
