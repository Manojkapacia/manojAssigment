import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './guards/auth.guards';
import { EditdataComponent } from './view/editdata/editdata.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./auth/auth.module')
  .then(m => m.AuthModule) },
  { path: 'deshboard', loadChildren: () => import('./view/view.module')
  .then(m => m.ViewModule),canActivate: [AuthGuard] },
  {path: "**", redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
