import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileData: any;
  imgUrl = 'assets/Image/avtar.png';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private route: Router
  ) {}

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

  uploadWinners(file: any) {
    let formData = new FormData();
    let uploadFile = file.files[0];
    formData.append('img', uploadFile);
    this.authService.addProfileImage(formData).subscribe((res: any) => {
      if (res && res.success) {
        this.imgUrl = res?.url || 'assets/Image/avtar.png';
        this.authService
          .setProfile({ profileImage: this.imgUrl })
          .subscribe((res) => {
            if(res){
              this.userService.setProfile(res);
              this.profileData = res;
            }
          });
      }
    });
  }
}
