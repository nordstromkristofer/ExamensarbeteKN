
import { NotFoundComponent } from './core/not-found/not-found.component';
import { LoginComponent } from './core/login/login.component';
import { NgModule } from '@angular/core';
import { CorsInterceptor } from './core/cors.interceptor'
import { RouterModule, Routes } from '@angular/router';
import { RowGeneratorComponent } from './calendar/row-generator/row-generator.component';
import { HeaderComponent } from './core/header/header.component';
import { LoginHeaderComponent } from './core/login/loginheader/login-header.component';
import { AuthGuard } from './core/authguard.service';


const routes: Routes = [
  {
    path: '',
    component: HeaderComponent,
    // canActivate: [AuthGuard], // Apply the AuthGuard to this route
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'calendar'
      },
      {
        path: 'calendar',
        component: RowGeneratorComponent,
        // canActivate: [AuthGuard] // Apply the AuthGuard to this child route as well
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    children: [
      {
        path: '',
        component: LoginHeaderComponent
      }
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: false, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
