import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsRoutingModule } from './forms-routing.module';
import { FormsComponent } from './components/forms/forms.component';

@NgModule({
  declarations: [FormsComponent],
  imports: [CommonModule, FormsRoutingModule],
})
export class FormsModule {}
