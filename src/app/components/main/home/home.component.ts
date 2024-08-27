import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  expenseData:any
  profileData:any
  totalLent: Number = 0;
  totalOwe:Number = 0;
  constructor(private userService:UserService) {}

  ngOnInit(): void {
    this.profileData = this.userService.getProfile();
    this.getExpense();
  }

  getExpense() {
    this.userService.getExpense().subscribe(
      (res: any) => {
       this.expenseData = res?.UserData;
       this.expenseData.forEach((element: any) => {
         if (element.friend1Phone == this.profileData.phone) {
           element.type = 'lent';
           this.totalLent = this.totalLent + element.amount
         } else {
           element.type = 'owe';
           this.totalOwe = this.totalOwe + element.amount;
         }
          const givenDate:any = new Date(element?.createdAt);
          const now:any = new Date();
          const diffInMs = now - givenDate;
          const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
          element.diffInDays = diffInDays;
       });
       console.log(this.expenseData);
      },
      (err) => {
        console.log('error happened',err)
      }
    );
  }
}
