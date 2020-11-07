import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user : any;
  constructor(
    private auth : AuthService
  ) { }

  ngOnInit() {
    this.auth.getCurrentUser(localStorage.getItem('userId')).subscribe(
      (data:any)=>{
        this.user = data.response;
      }
    )
  }

}
