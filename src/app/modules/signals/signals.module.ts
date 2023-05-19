import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignalsRoutingModule } from './signals-routing.module';
import { SignalsComponent } from './components/signals/signals.component';

@NgModule({
  declarations: [SignalsComponent],
  imports: [CommonModule, SignalsRoutingModule],
})
export class SignalsModule {}
