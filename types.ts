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
  capacity: string;
  image: string;
  type: 'local' | 'imported';
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
  CLIENTS = 'CLIENTS',
  CONTACT = 'CONTACT',
  POST_DETAIL = 'POST_DETAIL',
  ADMIN_DASHBOARD = 'ADMIN_DASHBOARD'
}