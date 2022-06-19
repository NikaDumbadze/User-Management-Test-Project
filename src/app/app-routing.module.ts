import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  {
    path: 'users',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./users/user-list/user-list.module').then(
            (u) => u.UserListModule
          ),
      },
      {
        path: 'edit/:id',
        loadChildren: () =>
          import('./users/user-detail/user-detail.module').then(
            (u) => u.UserDetailModule
          ),
      },
      {
        path: 'add',
        loadChildren: () =>
          import('./users/user-detail/user-detail.module').then(
            (u) => u.UserDetailModule
          ),
      },
    ],
  },
  {
    path: '**',
    loadChildren: () =>
      import('./page-not-found/page-not-found.module').then(
        (p) => p.PageNotFoundModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
