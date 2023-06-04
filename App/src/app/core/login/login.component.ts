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

  /*   submit(form: NgForm) {
      if (!form.valid) {
        return;
      }
  
      this.errorMessage = null;
  
      this.loggingIn = true;
  
      this.authService.login({ username: this.username, password: this.password }).pipe(
        catchError((error) => {
          this.resetPassword();
  
          return throwError(error);
        }),
        finalize(() => {
          this.loggingIn = false;
  
        })
      ).subscribe(res => {
        this.router.navigate(['/']);
      }, error => {
        this.setErrorMessage(error);
      });
    }
  
    private setErrorMessage(error: any) {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        const errorDetails = error.error;
        if (Array.isArray(errorDetails) && errorDetails.length) {
          this.errorMessage = errorDetails.join('. ');
        } else if (typeof errorDetails === 'string') {
          this.errorMessage = errorDetails;
        } else {
          this.errorMessage = 'Unauthorized';
        }
      } else {
        this.errorMessage = 'An error occured';
      }
    }
  
    private resetPassword() {
      this.password = null;
    }
  
    private resetCredentials() {
      this.username = null;
      this.password = null;
    } */
}
