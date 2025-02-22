import { CommentStatus } from './enums';

export interface Comment {
  id: string;
  filename: string;
  type: string;
  content: string;
  image: string;
  checked?: boolean;
  status: CommentStatus;
} 