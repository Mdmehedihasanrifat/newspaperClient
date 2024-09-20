
export interface Author {
    id: number;
    name: string;
    profile: string;
  }
  export interface User {
    id: number;
    name: string;
    profile: string;
  }
  
  export interface Category {
    id: number;
    name: string;
  }
  
  export interface NewsDetails {
    id: number;
    headline: string;
    details: string;
    image: string;
    author: Author;
    categories: Category[];
  }
  
  export interface Comment {
    id: number;
    text: string;
    createdAt: string;
    author: Author;
  }