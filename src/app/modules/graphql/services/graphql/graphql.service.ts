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

  /**
   * Returns an Observable of ApolloQueryResult<PostsResult> that represents a list of posts.
   *
   * @param {number} page - The page number to retrieve.
   * @param {number} limit - The number of posts to retrieve per page.
   * @returns {Observable<ApolloQueryResult<PostsResult>>} An Observable of ApolloQueryResult<PostsResult> that represents a list of posts.
   */
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

  /**
   * Retrieves a single post by its ID from the server using Apollo client.
   *
   * @param {string} id - the ID of the post to retrieve
   * @return {Observable<ApolloQueryResult<Post>>} an observable that emits a single value, which is the queried post
   */
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

  /**
   * Creates a new post and returns an observable that emits the result of the mutation.
   *
   * @param {Post} post - The post object with the title and body to create.
   * @return {Observable<MutationResult<CreatePostResponse>>} An observable that emits the mutation result.
   */
  createPost(post: Post): Observable<MutationResult<CreatePostResponse>> {
    return this.apollo.mutate<CreatePostResponse>({
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

  /**
   * Updates a post via Apollo GraphQL mutation.
   *
   * @param {Post} post - The post object to be updated.
   * @return {Observable<MutationResult<UpdatePostResponse>>} - An observable that emits the mutation result of type UpdatePostResponse.
   */
  updatePost(post: Post): Observable<MutationResult<UpdatePostResponse>> {
    return this.apollo.mutate<UpdatePostResponse>({
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

  /**
   * Deletes a post with the given ID.
   *
   * @param {string} id - The ID of the post to delete.
   * @return {Observable<MutationResult<DeletePostResponse>>} An observable that emits the result of the mutation.
   */
  deletePost(id: string): Observable<MutationResult<DeletePostResponse>> {
    return this.apollo.mutate<DeletePostResponse>({
      mutation: gql`
        mutation ($id: String!) {
          deletePost(id: $id)
        }
      `,
      variables: { id },
    });
  }
}
