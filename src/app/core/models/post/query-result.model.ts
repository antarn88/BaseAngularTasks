import { PostData } from './post-data.model';

export interface UserPostsResult {
  user: PostData;
  loading: boolean;
}
