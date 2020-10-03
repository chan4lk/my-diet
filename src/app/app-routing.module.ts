import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
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
    loadChildren: () => import('./auth/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./diet/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'add',
    loadChildren: () => import('./diet/add/add.module').then( m => m.AddPageModule)
  },
  {
    path: 'edit',
    loadChildren: () => import('./diet/edit/edit.module').then( m => m.EditPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./config/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'plan',
    loadChildren: () => import('./config/plan/plan.module').then( m => m.PlanPageModule)
  },
  {
    path: 'progress',
    loadChildren: () => import('./config/progress/progress.module').then( m => m.ProgressPageModule)
  },
  {
    path: 'report',
    loadChildren: () => import('./config/report/report.module').then( m => m.ReportPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
