import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileData: any;

  constructor(private userService: UserService, private route: Router) {}

  ngOnInit(): void {
    this.profileData = this.userService.getProfile();
  }

  logOut() {
    this.removeCookie('auth_token');
    this.route.navigate(['/login/signIn']);
  }
  removeCookie(name: string) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }
}
