import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, MutationResult, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

import { CreatePostResponse } from 'src/app/core/models/post/create-post-response.model';
import { DeletePostResponse } from 'src/app/core/models/post/delete-post-response.model';
import { Post } from 'src/app/core/models/post/post.model';
import { PostsResult } from 'src/app/core/models/post/posts-result.model';
import { UpdatePostResponse } from 'src/app/core/models/post/update-post.response.model';

@Injectable({
  providedIn: 'root',
})
export class GraphqlService {
  constructor(private apollo: Apollo) {}

  getPostList(page: number, limit: number): Observable<ApolloQueryResult<PostsResult>> {
    return this.apollo.query<PostsResult>({
      query: gql`
        query ($page: Int!, $limit: Int!) {
          posts(page: $page, limit: $limit) {
            id
            title
            body
          }
        }
      `,
      fetchPolicy: 'network-only', // Kikapcsolva a cache
      variables: { page, limit }, // Lapozáshoz
    });
  }

  getOnePost(id: string): Observable<ApolloQueryResult<Post>> {
    return this.apollo.query<Post>({
      query: gql`
        query ($id: String!) {
          post(id: $id) {
            id
            title
            body
          }
        }
      `,
      fetchPolicy: 'network-only', // Kikapcsolva a cache
      variables: { id },
    });
  }

  createPost(post: Post): Observable<MutationResult<CreatePostResponse>> {
    return this.apollo.mutate({
      mutation: gql`
        mutation ($title: String!, $body: String!) {
          createPost(createPostInput: { title: $title, body: $body }) {
            id
            title
            body
          }
        }
      `,
      variables: { title: post.title, body: post.body },
    });
  }

  updatePost(post: Post): Observable<MutationResult<UpdatePostResponse>> {
    return this.apollo.mutate({
      mutation: gql`
        mutation ($id: String!, $title: String!, $body: String!) {
          updatePost(id: $id, updatePostInput: { title: $title, body: $body }) {
            id
            title
            body
          }
        }
      `,
      variables: { id: post.id, title: post.title, body: post.body },
    });
  }

  deletePost(id: string): Observable<MutationResult<DeletePostResponse>> {
    return this.apollo.mutate({
      mutation: gql`
        mutation ($id: String!) {
          deletePost(id: $id) {
            id
            title
            body
          }
        }
      `,
      variables: { id },
    });
  }
}
