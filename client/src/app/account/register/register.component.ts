import { Router } from '@angular/router';
import { AccountService } from './../account.service';
import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  errors: string [];
  constructor(private fb: FormBuilder,
              private accountService: AccountService,
              private router: Router) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  // tslint:disable-next-line:typedef
  createRegisterForm() {
    this.registerForm = this.fb.group(
      {
        displayName: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email], [this.validateEmailNotTaken()]],
        password: [null, Validators.required]
      }
    );
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.accountService.register(this.registerForm.value).subscribe(
    response => {
      this.router.navigateByUrl('/shop');
    }, error => {
      console.log(error);
      this.errors = error.errors;
    }
    );
  }

  validateEmailNotTaken(): AsyncValidatorFn {
    return control => {
      return timer(500).pipe(
      switchMap(() => {
        if (!control.value) {
          return of(null);
        }
        return this.accountService.checkIfEmailExists(control.value).pipe(
          map(res => {
            return res ? {emailExists: true} : null;
          })
        );
      })
      );
    };
  }
}
