import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewchildComponent } from './components/viewchild/viewchild.component';

const routes: Routes = [
  {
    path: '',
    component: ViewchildComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewchildRoutingModule {}
