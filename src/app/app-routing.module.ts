import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UserGuard } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    canActivate: [UserGuard],
    loadChildren: () =>
      import('./folder/folder.module').then((m) => m.FolderPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./auth/signup/signup.module').then((m) => m.SignupPageModule),
  },
  {
    path: 'home',
    canActivate: [UserGuard],
    loadChildren: () =>
      import('./diet/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'add/:menu',
    canActivate: [UserGuard],
    loadChildren: () =>
      import('./diet/add/add.module').then((m) => m.AddPageModule),
  },
  {
    path: 'edit/:menu/:id',
    canActivate: [UserGuard],
    loadChildren: () =>
      import('./diet/edit/edit.module').then((m) => m.EditPageModule),
  },
  {
    path: 'profile',
    canActivate: [UserGuard],
    loadChildren: () =>
      import('./config/profile/profile.module').then(
        (m) => m.ProfilePageModule
      ),
  },
  {
    path: 'plan',
    canActivate: [UserGuard],
    loadChildren: () =>
      import('./config/plan/plan.module').then((m) => m.PlanPageModule),
  },
  {
    path: 'progress',
    canActivate: [UserGuard],
    loadChildren: () =>
      import('./config/progress/progress.module').then(
        (m) => m.ProgressPageModule
      ),
  },
  {
    path: 'report',
    canActivate: [UserGuard],
    loadChildren: () =>
      import('./config/report/report.module').then((m) => m.ReportPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
