import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-friend-expense',
  templateUrl: './friend-expense.component.html',
  styleUrls: ['./friend-expense.component.scss'],
})
export class FriendExpenseComponent implements OnInit {
  routingData: any;
  expenseData: any;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['type'] == 'friend') {
        this.routingData = JSON.parse(params['data']);
      }
    });
    this.expenseData = this.userService.getPersonalExpense();
    this.expenseData = this.expenseData.filter((ele: any) => {
      return (
        ele.friend1Phone == this.routingData?.phone ||
        ele.friend2Phone == this.routingData?.phone
      );
    });

    console.log(this.expenseData);
  }

  editItem(item: any) {}
  deleteItem(item: any) {}
}
