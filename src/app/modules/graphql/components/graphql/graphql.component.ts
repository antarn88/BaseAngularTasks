import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ApolloError, ApolloQueryResult } from '@apollo/client/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MutationResult } from 'apollo-angular';

import { Post } from 'src/app/core/models/post/post.model';
import { PostsResult } from 'src/app/core/models/post/posts-result.model';
import { CreatePostResponse } from 'src/app/core/models/post/create-post-response.model';
import { DeletePostResponse } from 'src/app/core/models/post/delete-post-response.model';
import { UpdatePostResponse } from 'src/app/core/models/post/update-post.response.model';
import { GraphqlService } from '../../services/graphql/graphql.service';

@Component({
  selector: 'app-graphql',
  templateUrl: './graphql.component.html',
  styleUrls: ['./graphql.component.scss'],
})
export class GraphqlComponent implements OnInit {
  loading = true;
  createLoading = false;
  deleteLoading = false;
  error?: ApolloError;
  posts: Post[] = [];
  currentPostId?: string;

  postForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    body: ['', Validators.required],
  });

  destroyRef: DestroyRef = inject(DestroyRef);

  constructor(private graphqlService: GraphqlService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.fetchPosts();
    // this.testUpdatePost();
  }

  fetchPosts(): void {
    this.graphqlService
      .getPostList(1, 25) // 1. oldal, max 25 elem
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result: ApolloQueryResult<PostsResult>) => {
        this.posts = result.data.posts;
        this.loading = result.loading;
        this.error = result.error;
      });
  }

  onClickOnePost(id: string): void {
    this.graphqlService
      .getOnePost(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result: ApolloQueryResult<Post>) => {
        alert(`GET ONE POST: ${JSON.stringify(result.data)}`);
      });
  }

  createPost(): void {
    this.createLoading = true;
    this.postForm.disable();
    this.graphqlService
      .createPost(this.postForm.value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result: MutationResult<CreatePostResponse>) => {
        if (result.data?.createPost) {
          this.postForm.reset();
          this.posts = [result.data.createPost, ...this.posts];
        }
        this.createLoading = result.loading;
        this.postForm.enable();
      });
  }

  updatePost(post: Post): void {
    this.graphqlService
      .updatePost(post)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result: MutationResult<UpdatePostResponse>) => {
        if (result.data?.updatePost) {
          this.posts = this.posts.map((post: Post) => (post.id === result.data?.updatePost.id ? result.data.updatePost : post));
        }
      });
  }

  testUpdatePost(): void {
    setTimeout(() => {
      const updatedPost: Post = {
        id: '646faa5b9f42244c1055ba6b',
        title: 'Frissített post cím új!',
        body: 'Frissített post tartalom új!',
      };
      this.updatePost(updatedPost);
    }, 10000);
  }

  onClickDeletePost(postId: string): void {
    this.currentPostId = postId;
    if (confirm('Biztosan törlöd a postot?')) {
      this.deleteLoading = true;
      this.graphqlService
        .deletePost(postId)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((result: MutationResult<DeletePostResponse>) => {
          if (result.data?.deletePost) {
            this.posts = this.posts.filter((post: Post) => post.id !== postId);
          }
          this.deleteLoading = result.loading;
        });
    }
  }
}
