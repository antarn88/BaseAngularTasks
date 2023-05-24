import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsRoutingModule } from './forms-routing.module';
import { FormsComponent } from './components/forms/forms.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FormsComponent],
  imports: [CommonModule, FormsRoutingModule, ReactiveFormsModule],
})
export class FormsModule {}
