export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostProps {
  post: Post
}

export interface PostCreated {
  title: string;
  body: string;
  id: number;
}

export interface PostPreviewProps {
  post: Post;
  key: number;
}