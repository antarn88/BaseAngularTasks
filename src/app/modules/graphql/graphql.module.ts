import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApolloClientOptions, InMemoryCache, NormalizedCacheObject, split } from '@apollo/client/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

import { GraphqlRoutingModule } from './graphql-routing.module';
import { GraphqlComponent } from './components/graphql/graphql.component';
import { GraphqlService } from './services/graphql/graphql.service';

const API_URL = 'http://localhost:5000/graphql';
const WS_URL = 'ws://localhost:5000/graphql';

@NgModule({
  declarations: [GraphqlComponent],
  imports: [CommonModule, GraphqlRoutingModule, ReactiveFormsModule, InfiniteScrollModule],
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink): ApolloClientOptions<NormalizedCacheObject> {
        const http = httpLink.create({ uri: API_URL });
        const ws = new GraphQLWsLink(createClient({ url: WS_URL }));

        const link = split(
          ({ query }) => {
            const definition = getMainDefinition(query);
            return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
          },
          ws,
          http
        );

        return { link, cache: new InMemoryCache() };
      },
      deps: [HttpLink],
    },
    GraphqlService,
  ],
})
export class GraphqlModule {}
