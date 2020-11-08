import { AuthService } from './../../services/auth.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private auth: AuthService
  ) {
    this.location = location;
  }
  user: any;

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.auth.getCurrentUser(localStorage.getItem('userId')).subscribe(
      (data: any) => {
        this.user = data.response;
        console.log(this.user);
        
      }
    )
  }
  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }
  logout() {
    this.auth.logout(localStorage.getItem('userToken')).subscribe(
      data => console.log(data)
    );
    this.router.navigateByUrl('/login');
    localStorage.clear();
  }
}
