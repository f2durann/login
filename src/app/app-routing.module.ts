import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { LoginComponent } from './components/login/login.component';
const redirectLogin = () => redirectUnauthorizedTo(['/login']);


const routes: Routes = [
  {
    path: '', component: HomeComponent, canActivate: [AngularFireAuthGuard], data: {
      authGuardPipe: redirectLogin
    }
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
