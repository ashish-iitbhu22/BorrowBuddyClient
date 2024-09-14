import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
interface Friend {
  name: string;
  amount: number;
}

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit {
  friendExpensedata: { [key: string]: Friend } = {};
  expenseData: any;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.expenseData = this.userService.getPersonalExpense();
    console.log(this.expenseData);

    this.expenseData.forEach((ele: any) => {
      if (ele?.type == 'lent') {
        if (this.friendExpensedata[ele.friend2Phone] == undefined) {
          this.friendExpensedata[ele.friend2Phone] = { name: '', amount: 0 };
        }
        this.friendExpensedata[ele.friend2Phone].amount =
          ele?.amount + this.friendExpensedata[ele.friend2Phone]?.amount;
        this.friendExpensedata[ele.friend2Phone].name = ele?.friend2Name;
      } else {
        if (this.friendExpensedata[ele.friend1Phone] == undefined) {
          this.friendExpensedata[ele.friend1Phone] = { name: '', amount: 0 };
        }
        this.friendExpensedata[ele.friend1Phone].amount =
          this.friendExpensedata[ele.friend1Phone]?.amount - ele?.amount;
        this.friendExpensedata[ele.friend1Phone].name = ele?.friend1Name;
      }
    });
    console.log(this.friendExpensedata);
  }
}
