export type Language = 'ar' | 'en';

export interface BlogPost {
  id: number;
  title: string;
  title_en?: string;
  excerpt: string;
  excerpt_en?: string;
  content: string;
  content_en?: string;
  date: string;
  image: string;
  category: string;
  category_en?: string;
}

export interface Product {
  id: number;
  name: string;
  name_en?: string;
  description: string;
  description_en?: string;
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
  PRODUCT_DETAIL = 'PRODUCT_DETAIL',
  ADMIN_DASHBOARD = 'ADMIN_DASHBOARD'
}