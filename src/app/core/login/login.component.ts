import { ApiService } from 'src/app/core/api.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { throwError } from 'rxjs';

@Component({
  selector: 'my-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private apiService: ApiService) { }

  form: NgForm;

  username!: string | null;
  password!: string | null;
  errorMessage!: string | null;
  loggingIn!: boolean;

  ngOnInit(): void {
    /*     this.resetCredentials(); */
  }

  login(): void {
    // Redirect to the desired page after successful login
    this.router.navigate(['/calendar']);

  }
}
