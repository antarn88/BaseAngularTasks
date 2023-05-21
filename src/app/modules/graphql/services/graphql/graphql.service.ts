import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

import { UserPostsResult } from 'src/app/core/models/post/query-result.model';
import { User } from 'src/app/core/models/user/user.model';

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

  getUser(): Observable<ApolloQueryResult<User>> {
    return this.apollo.query<User>({
      query: gql`
        {
          user(id: 1) {
            id
            name
            username
            email
            phone
            website
            address {
              geo {
                lat
                lng
              }
            }
            company {
              name
              catchPhrase
              bs
            }
          }
        }
      `,
      fetchPolicy: 'network-only', // Kikapcsolva a cache
    });
  }
}
