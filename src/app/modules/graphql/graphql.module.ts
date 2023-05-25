import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApolloClientOptions, InMemoryCache, NormalizedCacheObject } from '@apollo/client/core';
import { ReactiveFormsModule } from '@angular/forms';

import { GraphqlRoutingModule } from './graphql-routing.module';
import { GraphqlComponent } from './components/graphql/graphql.component';
import { GraphqlService } from './services/graphql/graphql.service';

const API_URL = 'http://localhost:5000/graphql';

export const createApollo = (httpLink: HttpLink): ApolloClientOptions<NormalizedCacheObject> => {
  return {
    link: httpLink.create({ uri: API_URL }),
    cache: new InMemoryCache(),
  };
};

@NgModule({
  declarations: [GraphqlComponent],
  imports: [CommonModule, GraphqlRoutingModule, ReactiveFormsModule],
  exports: [ApolloModule],
  providers: [{ provide: APOLLO_OPTIONS, useFactory: createApollo, deps: [HttpLink] }, GraphqlService],
})
export class GraphqlModule {}
