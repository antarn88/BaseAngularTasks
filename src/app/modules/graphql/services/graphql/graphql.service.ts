import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

import { UserPostsResult } from 'src/app/core/models/post/query-result.model';

@Injectable({
  providedIn: 'root',
})
export class GraphqlService {
  constructor(private apollo: Apollo) {}

  getPostList(): Observable<ApolloQueryResult<UserPostsResult>> {
    return this.apollo.query<UserPostsResult>({
      query: gql`
        {
          user(id: 1) {
            posts {
              data {
                id
                title
                body
              }
            }
          }
        }
      `,
      fetchPolicy: 'network-only', // Kikapcsolva a cache
    });
  }
}
