//import { LoginComponent } from './../login/login.component';
import { SharedModule } from './shared.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { SkipInterceptorService } from './skip-interceptor.service';
import { AuthService } from './auth.service';
import { ApiService } from './api.service';
import { NgModule, Optional, SkipSelf } from "@angular/core";
import { MatDialogConfig, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { HttpErrorInterceptor } from './http-error.interceptor';
import { TokenInterceptor } from './token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
    declarations: [
        //LoginComponent,
        NotFoundComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        SharedModule
    ],
    providers: [
        AuthService,
        ApiService,
        SkipInterceptorService,
        {
            provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {
                ...new MatDialogConfig(),
                disableClose: true
            }
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
      if (parentModule) {
        throw new Error('CoreModule is already loaded. Import it in the AppModule only');
      }
    }
  }
