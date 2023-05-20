import { Post } from './post.model';

export interface PostData {
  posts: {
    data: Post[];
  };
}
