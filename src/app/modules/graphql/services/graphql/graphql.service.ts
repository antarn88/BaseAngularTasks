import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, MutationResult, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

import { CreatePostResponse } from 'src/app/core/models/post/create-post-response.model';
import { DeletePostResponse } from 'src/app/core/models/post/delete-post-response.model';
import { Post } from 'src/app/core/models/post/post.model';
import { UserPostsResult } from 'src/app/core/models/post/query-result.model';
import { UpdatePostResponse } from 'src/app/core/models/post/update-post.response.model';

@Injectable({
  providedIn: 'root',
})
export class GraphqlService {
  constructor(private apollo: Apollo) {}

  getPostList(page: number, limit: number): Observable<ApolloQueryResult<UserPostsResult>> {
    return this.apollo.query<UserPostsResult>({
      query: gql`
        query ($options: PageQueryOptions) {
          user(id: 1) {
            posts(options: $options) {
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
      variables: {
        options: {
          paginate: { page, limit }, // Lapozáshoz
        },
      },
    });
  }

  getOnePost(id: string): Observable<ApolloQueryResult<Post>> {
    return this.apollo.query<Post>({
      query: gql`
        {
          post(id: ${id}) {
            id
            title
            body
          }
        }
      `,
      fetchPolicy: 'network-only', // Kikapcsolva a cache
    });
  }

  createPost(post: Post): Observable<MutationResult<CreatePostResponse>> {
    return this.apollo.mutate({
      mutation: gql`
        mutation {
          createPost(input: { title: "${post.title}", body: "${post.body}" }) {
            id
            title
            body
          }
        }
      `,
    });
  }

  updatePost(post: Post): Observable<MutationResult<UpdatePostResponse>> {
    return this.apollo.mutate({
      mutation: gql`
        mutation {
          updatePost(id: ${post.id}, input: { title: "${post.title}", body: "${post.body}" }) {
            id
            title
            body
          }
        }
      `,
    });
  }

  deletePost(id: string): Observable<MutationResult<DeletePostResponse>> {
    return this.apollo.mutate({
      mutation: gql`
        mutation {
          deletePost(id: ${id})
        }
      `,
    });
  }
}
