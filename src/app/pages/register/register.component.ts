import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    private auth: AuthService,
    private formBuilder : FormBuilder,
    private router : Router
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      password: ['', Validators.required],
      agree: ['', Validators.required],
    });
  }
  ngOnInit() {
  }
  register(){
    if(this.registerForm.value.agree){
      let newUser = {
        'email' : this.registerForm.value.email,
        'password' : this.registerForm.value.password,
        'name' : this.registerForm.value.name,
      }
      this.auth.signup(newUser).subscribe(
        (data:any)=>{
          localStorage.setItem('userToken', data.response.token);
          localStorage.setItem('userId', data.response.user_id);
          this.router.navigateByUrl('/dashboard')
        }
      )
    } else {
      console.log('please accept');
    }
  }
}
