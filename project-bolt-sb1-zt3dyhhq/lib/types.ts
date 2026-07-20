export type Category =
  | 'burgers'
  | 'pizza'
  | 'wraps'
  | 'appetizers'
  | 'desserts'
  | 'drinks';

export type DietTag = 'vegetarian' | 'vegan' | 'spicy' | 'gluten-free' | 'halal';

export interface MenuItem {
  id: string;
  name: string;
  category: Category;
  description: string;
  ingredients: string[];
  calories: number;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  tags: DietTag[];
  featured?: boolean;
  popular?: boolean;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: Category;
  quantity: number;
}

export interface CategoryMeta {
  id: Category;
  label: string;
  blurb: string;
  icon: string;
}

/* ---------- Chat protocol ---------- */

export type ChatRole = 'user' | 'assistant';

export interface ChatCartSummary {
  itemCount: number;
  subtotal: number;
}

export interface ChatToolResult {
  tool?: string;
  cart?: CartItem[];
  cartSummary?: ChatCartSummary;
  suggestedPrompts?: string[];
}

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: number;
  pending?: boolean;
  toolResult?: ChatToolResult;
}

export interface BackendChatResponse {
  reply?: string;
  message?: string;
  tool?: string;
  cart?: CartItem[];
  cartSummary?: ChatCartSummary;
  suggestedPrompts?: string[];
}
