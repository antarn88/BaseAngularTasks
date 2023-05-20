import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ApolloError, ApolloQueryResult } from '@apollo/client/core';

import { Post } from 'src/app/core/models/post/post.model';
import { UserPostsResult } from 'src/app/core/models/post/query-result.model';
import { GraphqlService } from '../../services/graphql/graphql.service';

@Component({
  selector: 'app-graphql',
  templateUrl: './graphql.component.html',
  styleUrls: ['./graphql.component.scss'],
})
export class GraphqlComponent implements OnInit {
  loading = true;
  error?: ApolloError;
  posts: Post[] = [];
  destroyRef: DestroyRef = inject(DestroyRef);

  constructor(private graphqlService: GraphqlService) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts(): void {
    this.graphqlService
      .getPostList()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result: ApolloQueryResult<UserPostsResult>) => {
        this.posts = result.data.user.posts.data;
        this.loading = result.loading;
        this.error = result.error;
      });
  }
}
