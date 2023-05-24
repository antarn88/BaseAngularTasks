import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule as NgFormsModule } from '@angular/forms';

import { FormsRoutingModule } from './forms-routing.module';
import { FormsComponent } from './components/forms/forms.component';

@NgModule({
  declarations: [FormsComponent],
  imports: [CommonModule, FormsRoutingModule, ReactiveFormsModule, NgFormsModule],
})
export class FormsModule {}
