import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'signals',
    loadChildren: () => import('./modules/signals/signals.module').then((m) => m.SignalsModule),
  },
  {
    path: 'forms',
    loadChildren: () => import('./modules/forms/forms.module').then((m) => m.FormsModule),
  },
  {
    path: 'graphql',
    loadChildren: () => import('./modules/graphql/graphql.module').then((m) => m.GraphqlModule),
  },
  {
    path: 'viewchild',
    loadChildren: () => import('./modules/viewchild/viewchild.module').then((m) => m.ViewchildModule),
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
