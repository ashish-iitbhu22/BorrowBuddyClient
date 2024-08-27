import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(private route: Router) {}

  ngOnInit(): void {
    this.route.navigate(['/main/home']);
  }

  navigateTo(path:string) {
    switch (path) {
      case 'home':
        this.route.navigate(['/main/home']);
        break;
      case 'add':
        this.route.navigate(['/main/add-expense']);
        break;
      case 'profile':
        this.route.navigate(['/main/profile']);
        break;
    }

  }
}
