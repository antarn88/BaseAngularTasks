import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraphqlRoutingModule } from './graphql-routing.module';
import { GraphqlComponent } from './components/graphql/graphql.component';

@NgModule({
  declarations: [GraphqlComponent],
  imports: [CommonModule, GraphqlRoutingModule],
})
export class GraphqlModule {}
