export type Language = 'ar' | 'en';

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
  category: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  capacity: string;
  image: string;
  type: 'car' | 'solar' | 'ups' | 'motorcycle';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum ViewState {
  HOME = 'HOME',
  ABOUT = 'ABOUT',
  BLOG = 'BLOG',
  PRODUCTS = 'PRODUCTS',
  CONTACT = 'CONTACT',
  POST_DETAIL = 'POST_DETAIL'
}