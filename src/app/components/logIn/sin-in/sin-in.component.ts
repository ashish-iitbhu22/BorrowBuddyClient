import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { distinctUntilChanged } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sin-in',
  templateUrl: './sin-in.component.html',
  styleUrls: ['./sin-in.component.scss'],
})
export class SinInComponent implements OnInit {
  sinUpForm!: FormGroup;
  oldName = '';
  errorMessage = '';
  allowedValues = [6, 7, 8, 9];
  oldNumber: Number | undefined;
  ctaDisable: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.formInitialise();
  }

  formInitialise() {
    this.sinUpForm = this.fb.group({
      phone: [
        null,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
        ],
      ],
      password: ['', [Validators.required]],
    });
    this.validateMobileNumber();
    this.passwordChangeDetection();
  }
  validateMobileNumber() {
    this.sinUpForm
      .get('phone')
      ?.valueChanges.pipe(distinctUntilChanged())
      .subscribe((value: any) => {
        this.errorMessage = '';
        if (!/^[0-9]*$/.test(value.toString().substr(-1))) {
          this.sinUpForm.get('phone')?.setValue(value.toString().slice(0, -1));
        }
        if (!value) return;
        if (value && value.toString().length > 0) {
          if (
            !this.allowedValues.find(
              (x) => x.toString() === value.toString()[0]
            )
          ) {
            this.sinUpForm.get('phone')?.setValue('');
          } else if (value.toString().length > 10) {
            this.sinUpForm.get('phone')?.setValue(this.oldNumber);
          } else {
            this.oldNumber = value;
          }
        }
      });
  }

  passwordChangeDetection() {
    this.sinUpForm
      .get('password')
      ?.valueChanges.pipe(distinctUntilChanged())
      .subscribe((value: any) => {
        this.errorMessage = '';
      });
  }

  navigateToSignUp(){
    this.route.navigate(['/login/signUp']);
  }

  togglePasswordVisibility(passwordInput: HTMLInputElement): void {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    const icon = passwordInput.nextElementSibling?.querySelector('i');
    if (icon) {
      icon.className = isPassword ? 'fa fa-eye-slash' : 'fa fa-eye';
    }
  }

  sinIn() {
    this.ctaDisable = true;
    let payload = {
      phone: this.sinUpForm.get('phone')?.value,
      password: this.sinUpForm.get('password')?.value,
    };
    this.authService.sinIn(payload).subscribe(
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
