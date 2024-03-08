import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent }    from './pages/products/products.component';
import { SignInComponent }      from './pages/sign-in/sign-in.component';
import { ListUserComponent } from './pages/list-user/list-user.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/login/login.module').then((mod) => mod.LoginModule),
  },
  {
    path: 'list-user',
    loadChildren: () =>
      import('./pages/list-user/list-user.module').then((mod) => mod.ListUserModule),
    component: ListUserComponent,
  },
  {
    path: 'sign-in',
    loadChildren: () =>
      import('./pages/sign-in/sign-in.module').then((mod) => mod.SignInModule),
    component: SignInComponent,
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./pages/products/products.module').then(
        (mod) => mod.ProductsModule
      ),
    component: ProductsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
