import { Comment } from '../types/interfaces';
import { CommentStatus } from '../types/enums';

const mockComments: Comment[] = [
  {
    id: "1",
    filename: "ELV-Obed01-01.png",
    type: "General",
    content: "This is a rejection comment for the first image",
    image: "/images/ELV-Obed01-01.png",
    checked: false,
    status: CommentStatus.PENDING,
  },
  {
    id: "2",
    filename: "ELV-Obed01-02.png",
    type: "General",
    content: "This is a rejection comment for second image",
    image: "/images/ELV-Obed01-02.png",
    checked: false,
    status: CommentStatus.PENDING,
  },
  {
    id: "3",
    filename: "ELV-Obed01-03.png",
    type: "General",
    content: "General comment value",
    image: "/images/ELV-Obed01-03.png",
    checked: false,
    status: CommentStatus.REMOVE,
  },
  {
    id: "4",
    filename: "ELV-Obed01-04.png",
    type: "General",
    content: "General comment value",
    image: "/images/ELV-Obed01-03.png",
    checked: false,
    status: CommentStatus.PENDING,
  },
  {
    id: "5",
    filename: "ELV-Obed01-05.png",
    type: "General",
    content: "General comment value",
    image: "/images/ELV-Obed01-03.png",
    checked: false,
    status: CommentStatus.PENDING,
  },
];

export const getComments = (): Promise<Comment[]> => {
  // TODO: API - Get comments
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockComments);
    }, 2000);
  });
}; 