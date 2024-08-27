import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { distinctUntilChanged } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sin-up',
  templateUrl: './sin-up.component.html',
  styleUrls: ['./sin-up.component.scss'],
})
export class SinUpComponent implements OnInit {
  sinUpForm!: FormGroup;
  oldName = '';
  allowedValues = [6, 7, 8, 9];
  oldNumber: Number | undefined;
  errorMessage = '';
  ctaDisable: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.formInitialise();
  }

  formInitialise() {
    this.sinUpForm = this.fb.group({
      fullName: ['', [Validators.required]],
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
      repassword: ['', [Validators.required]],
    });
    this.validateName();
    this.validateMobileNumber();
    this.detectPasswordChange();
  }

  validateName() {
    this.sinUpForm
      .get('fullName')
      ?.valueChanges.pipe(distinctUntilChanged())
      .subscribe((value) => {
        this.errorMessage = '';
        if (!value || value === this.oldName) {
          return;
        }

        if (value.length > 16) {
          this.sinUpForm.get('fullName')?.setValue(this.oldName);
        } else if (!/^[a-zA-Z ]*$/.test(value)) {
          if (value <= 1) {
            this.sinUpForm.get('fullName')?.setValue('');
          } else {
            this.sinUpForm.get('fullName')?.setValue(this.oldName);
          }
        } else {
          this.oldName = value;
        }
      });
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

  detectPasswordChange(){
     this.sinUpForm
       .get('password')
       ?.valueChanges.pipe(distinctUntilChanged())
       .subscribe((value: any) => {
        this.errorMessage = '';
        if (value === this.sinUpForm.get('repassword')?.value) {
          this.ctaDisable = false;
        }else{
           this.ctaDisable = true
        }
       });

        this.sinUpForm
          .get('repassword')
          ?.valueChanges.pipe(distinctUntilChanged())
          .subscribe((value: any) => {
              this.errorMessage = '';
              if (value === this.sinUpForm.get('password')?.value) {
                this.ctaDisable = false;
              }else{
                 this.ctaDisable = true;
              }
          });
  }
  togglePasswordVisibility(passwordInput: HTMLInputElement): void {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    const icon = passwordInput.nextElementSibling?.querySelector('i');
    if (icon) {
      icon.className = isPassword ? 'fa fa-eye-slash' : 'fa fa-eye';
    }
  }

  navigateToSignInp() {
    this.route.navigate(['/login/signIn']);
  }

  adduser() {
    let payload = {
      fullName: this.sinUpForm.get('fullName')?.value,
      phone: this.sinUpForm.get('phone')?.value,
      password: this.sinUpForm.get('password')?.value,
    };
    this.authService.sinUp(payload).subscribe(
      (res: any) => {
        this.ctaDisable = false;
        console.log(res);
        if (res && res.success) {
          this.route.navigate(['/login/signIn']);
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
