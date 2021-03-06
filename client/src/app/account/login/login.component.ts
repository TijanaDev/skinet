import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from './../account.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: string;
  constructor(private accountService: AccountService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.createLoginForm();
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || 'shop';
  }

  // tslint:disable-next-line:typedef
  createLoginForm() {
    this.loginForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required),

      }
    );
  }
  // tslint:disable-next-line:typedef
  onSubmit(){
    console.log(this.loginForm.value);
    this.accountService.login(this.loginForm.value).subscribe(() => {
    this.router.navigateByUrl(this.returnUrl);
    }, error => {
      console.log(error);
    }
    );
  }
}
