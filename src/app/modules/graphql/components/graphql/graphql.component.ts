import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ApolloError, ApolloQueryResult } from '@apollo/client/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MutationResult } from 'apollo-angular';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Post } from 'src/app/core/models/post/post.model';
import { PostsResult } from 'src/app/core/models/post/posts-result.model';
import { CreatePostResponse } from 'src/app/core/models/post/create-post-response.model';
import { DeletePostResponse } from 'src/app/core/models/post/delete-post-response.model';
import { UpdatePostResponse } from 'src/app/core/models/post/update-post.response.model';
import { GraphqlService } from '../../services/graphql/graphql.service';

declare const bootstrap: typeof import('bootstrap');

@Component({
  selector: 'app-graphql',
  templateUrl: './graphql.component.html',
  styleUrls: ['./graphql.component.scss'],
})
export class GraphqlComponent implements OnInit {
  loading = false;
  createLoading = false;
  deleteLoading = false;
  updateLoading = false;
  error?: ApolloError;
  posts: Post[] = [];
  currentPostId?: string;
  currentPage = 1;
  pageSize = 25;
  firstPageLoaded = false;

  postForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    body: ['', Validators.required],
  });

  editPostForm: FormGroup = this.fb.group({
    id: [''],
    title: ['', Validators.required],
    body: ['', Validators.required],
  });

  destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private graphqlService: GraphqlService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscribeToPageChanges();
  }

  fetchPosts(): void {
    this.loading = true;
    this.graphqlService
      .getPostList(this.currentPage, this.pageSize)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result: ApolloQueryResult<PostsResult>) => {
        this.currentPage++;
        this.posts = [...this.posts, ...result.data.posts];
        this.loading = result.loading;
        this.error = result.error;
        this.firstPageLoaded = true;
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
          this.router.navigate([], { queryParams: { page: null }, queryParamsHandling: 'merge' });
        }
        this.createLoading = result.loading;
        this.postForm.enable();
      });
  }

  updatePost(post: Post): void {
    this.updateLoading = true;
    this.graphqlService
      .updatePost(post)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result: MutationResult<UpdatePostResponse>) => {
        if (result.data?.updatePost) {
          this.posts = this.posts.map((post: Post) => (post.id === result.data?.updatePost.id ? result.data.updatePost : post));
        }

        const modalElement = document.getElementById('editPostModal');
        if (modalElement) {
          const modal = bootstrap.Modal.getInstance(modalElement);
          this.updateLoading = result.loading;
          modal?.hide();
        }
      });
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

  onClickEdit(post: Post): void {
    this.editPostForm.patchValue({ id: post.id, title: post.title, body: post.body });
  }

  onScroll(): void {
    if (!this.loading) {
      this.router.navigate([], { queryParams: { page: this.currentPage }, queryParamsHandling: 'merge' });
    }
  }

  subscribeToPageChanges(): void {
    this.route.queryParams.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params: Params) => {
      this.currentPage = +params['page'] || 1;
      if (this.currentPage === 1) {
        this.posts = [];
      }

      if (!this.loading) {
        this.fetchPosts();
      }
    });
  }
}
