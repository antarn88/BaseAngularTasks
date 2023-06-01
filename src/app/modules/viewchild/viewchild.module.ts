import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewchildRoutingModule } from './viewchild-routing.module';
import { ViewchildComponent } from './components/viewchild/viewchild.component';


@NgModule({
  declarations: [
    ViewchildComponent
  ],
  imports: [
    CommonModule,
    ViewchildRoutingModule
  ]
})
export class ViewchildModule { }
