import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { distinctUntilChanged } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
})
export class AddExpenseComponent implements OnInit {
  expenseForm!: FormGroup;
  oldName = '';
  errorMessage = '';
  allowedValues = [6, 7, 8, 9];
  oldNumber: Number | undefined;
  oldAmount: Number | undefined;
  ctaDisable: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.intialiseForm();
  }

  intialiseForm() {
    this.expenseForm = this.fb.group({
      friendName: ['', [Validators.required]],
      friendNumber: [
        null,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
        ],
      ],
      transactionType: ['lent'],
      amount: [null, [Validators.required]],
      desc: [''],
    });
    this.validateMobileNumber();
    this.validateAmount();
  }

  validateMobileNumber() {
    this.expenseForm
      .get('friendNumber')
      ?.valueChanges.pipe(distinctUntilChanged())
      .subscribe((value: any) => {
        this.errorMessage = '';
        if (!/^[0-9]*$/.test(value.toString().substr(-1))) {
          this.expenseForm
            .get('friendNumber')
            ?.setValue(value.toString().slice(0, -1));
        }
        if (!value) return;
        if (value && value.toString().length > 0) {
          if (
            !this.allowedValues.find(
              (x) => x.toString() === value.toString()[0]
            )
          ) {
            this.expenseForm.get('friendNumber')?.setValue('');
          } else if (value.toString().length > 10) {
            this.expenseForm.get('friendNumber')?.setValue(this.oldNumber);
          } else {
            this.oldNumber = value;
          }
        }
      });
  }

  validateAmount() {
    this.expenseForm
      .get('amount')
      ?.valueChanges.pipe(distinctUntilChanged())
      .subscribe((value: any) => {
        this.errorMessage = '';
        if (!/^[0-9]*$/.test(value.toString().substr(-1))) {
          this.expenseForm
            .get('amount')
            ?.setValue(value.toString().slice(0, -1));
        }
        if (!value) return;
        if (value && value.toString().length > 0) {
          if (value.toString().length > 10) {
            this.expenseForm.get('amount')?.setValue(this.oldAmount);
          } else {
            this.oldAmount = value;
          }
        }
      });
  }

  addExpense() {
       let payload = {
         friendName: this.expenseForm.get('friendName')?.value,
         friendNumber: this.expenseForm.get('friendNumber')?.value,
         amount: this.expenseForm.get('amount')?.value,
         type: this.expenseForm.get('transactionType')?.value,
         desc: this.expenseForm.get('desc')?.value,
       };
     console.log(payload);
    this.userService.addExpense(payload).subscribe(
      (res: any) => {
        this.ctaDisable = false;
        console.log(res);
        if (res && res.success) {
          this.route.navigate(['/main/home']);
        } else {
          this.errorMessage = res?.message;
        }
      },
      (err) => {
        this.ctaDisable = false;
        this.errorMessage = err.error.message;
      }
    );
  }
}
