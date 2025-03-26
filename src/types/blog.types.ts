export interface BlogPost {
    _id: string;
    title: string;
    content: string;
    image?: string;
    author: {
      _id: string;
      name: string;
    };
    tags: string[];
    createdAt: string;
    updatedAt: string;
  }