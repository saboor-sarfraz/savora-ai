import type { CategoryMeta, MenuItem } from './types';

export const RESTAURANT = {
  name: 'Savora',
  tagline: 'AI Food Assistant',
  phone: '+1 (415) 555-0192',
  email: 'hello@savora.ai',
  address: '318 Mission Street, San Francisco, CA 94105',
  hours: [
    { day: 'Monday — Thursday', time: '11:00 AM — 10:00 PM' },
    { day: 'Friday — Saturday', time: '11:00 AM — 12:00 AM' },
    { day: 'Sunday', time: '12:00 PM — 9:00 PM' },
  ],
  social: {
    instagram: 'https://instagram.com',
    twitter: 'https://twitter.com',
    facebook: 'https://facebook.com',
  },
};

export const CATEGORIES: CategoryMeta[] = [
  {
    id: 'burgers',
    label: 'Burgers',
    blurb: 'Flame-grilled, stacked, and impossibly juicy.',
    icon: 'Beef',
  },
  {
    id: 'pizza',
    label: 'Pizza',
    blurb: 'Wood-fired crusts with slow-fermented dough.',
    icon: 'Pizza',
  },
  {
    id: 'wraps',
    label: 'Wraps',
    blurb: 'Fresh, foldable, and ready on the go.',
    icon: 'Burrito',
  },
  {
    id: 'appetizers',
    label: 'Appetizers',
    blurb: 'Small plates built for sharing.',
    icon: 'Soup',
  },
  {
    id: 'desserts',
    label: 'Desserts',
    blurb: 'A sweet finish worth saving room for.',
    icon: 'CakeSlice',
  },
  {
    id: 'drinks',
    label: 'Drinks',
    blurb: 'House-crafted sodas, shakes, and brews.',
    icon: 'CupSoda',
  },
];

export const TAX_RATE = 0.0875;
export const DELIVERY_FEE = 3.99;
export const FREE_DELIVERY_THRESHOLD = 35;

export const CURRENCY_FORMATTER = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export function formatPrice(value: number): string {
  return CURRENCY_FORMATTER.format(value);
}

export const MENU: MenuItem[] = [
  // ---------- BURGERS ----------
  {
    id: 'brg-classic',
    name: 'Classic Cheeseburger',
    category: 'burgers',
    description:
      'A double smash of grass-fed Angus, aged cheddar, butter-toasted brioche, and house sauce.',
    ingredients: [
      'Angus beef',
      'aged cheddar',
      'brioche bun',
      'house sauce',
      'pickles',
      'onion',
    ],
    calories: 680,
    price: 12.5,
    rating: 4.8,
    reviews: 1240,
    image:
      'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=900',
    tags: ['halal'],
    featured: true,
    popular: true,
  },
  {
    id: 'brg-truffle',
    name: 'Truffle Swiss Burger',
    category: 'burgers',
    description:
      'Wagyu blend patty, melted Gruyère, black truffle aioli, and caramelized shallots.',
    ingredients: [
      'Wagyu blend beef',
      'Gruyère',
      'truffle aioli',
      'caramelized shallots',
      'arugula',
    ],
    calories: 740,
    price: 17.0,
    rating: 4.9,
    reviews: 612,
    image:
      'https://images.pexels.com/photos/2702674/pexels-photo-2702674.jpeg?auto=compress&cs=tinysrgb&w=900',
    tags: ['halal'],
    featured: true,
  },
  {
    id: 'brg-spicy',
    name: 'Firecracker Burger',
    category: 'burgers',
    description:
      'Pepper-jack, ghost-pepper jam, jalapeños, and crispy onions for serious heat.',
    ingredients: [
      'Angus beef',
      'pepper jack',
      'ghost-pepper jam',
      'jalapeños',
      'crispy onions',
    ],
    calories: 710,
    price: 14.5,
    rating: 4.7,
    reviews: 488,
    image:
      'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=900',
    tags: ['spicy', 'halal'],
    popular: true,
  },
  {
    id: 'brg-veggie',
    name: 'Garden Veggie Burger',
    category: 'burgers',
    description:
      'House-made beet-and-quinoa patty, smoked tofu spread, and avocado on a whole-wheat bun.',
    ingredients: [
      'beet-quinoa patty',
      'smoked tofu spread',
      'avocado',
      'tomato',
      'whole-wheat bun',
    ],
    calories: 520,
    price: 13.0,
    rating: 4.6,
    reviews: 356,
    image:
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=900',
    tags: ['vegetarian', 'vegan'],
  },

  // ---------- PIZZA ----------
  {
    id: 'pz-supreme',
    name: 'Veggie Supreme Pizza',
    category: 'pizza',
    description:
      'Wood-fired Margherita base with roasted peppers, mushrooms, olives, and fresh basil.',
    ingredients: [
      'San Marzano tomato',
      'mozzarella',
      'roasted peppers',
      'mushrooms',
      'olives',
      'basil',
    ],
    calories: 880,
    price: 16.5,
    rating: 4.8,
    reviews: 720,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxceDKAx4AL9msn5HDCymUJDjO0NVQyKjmNlbpbt5n5Q&s=10',
    tags: ['vegetarian'],
    featured: true,
    popular: true,
  },
  {
    id: 'pz-diavola',
    name: 'Diavola Pizza',
    category: 'pizza',
    description:
      'Spicy salami, Calabrian chili, mozzarella, and a drizzle of hot honey.',
    ingredients: [
      'spicy salami',
      'Calabrian chili',
      'mozzarella',
      'hot honey',
      'oregano',
    ],
    calories: 940,
    price: 17.5,
    rating: 4.7,
    reviews: 540,
    image:
      'https://images.pexels.com/photos/803290/pexels-photo-803290.jpeg?auto=compress&cs=tinysrgb&w=900',
    tags: ['spicy'],
    popular: true,
  },
  {
    id: 'pz-margherita',
    name: 'Margherita D.O.P.',
    category: 'pizza',
    description:
      'San Marzano tomatoes, fior di latte, extra-virgin olive oil, and fresh basil.',
    ingredients: [
      'San Marzano tomato',
      'fior di latte',
      'olive oil',
      'basil',
      'sea salt',
    ],
    calories: 820,
    price: 14.0,
    rating: 4.9,
    reviews: 980,
    image:
      'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=900',
    tags: ['vegetarian'],
  },
  {
    id: 'pz-quattro',
    name: 'Quattro Formaggi',
    category: 'pizza',
    description:
      'Mozzarella, gorgonzola, fontina, and Parmigiano on a white base with cracked pepper.',
    ingredients: [
      'mozzarella',
      'gorgonzola',
      'fontina',
      'Parmigiano',
      'cracked pepper',
    ],
    calories: 960,
    price: 18.0,
    rating: 4.6,
    reviews: 410,
    image:
      'https://images.pexels.com/photos/4109111/pexels-photo-4109111.jpeg?auto=compress&cs=tinysrgb&w=900',
    tags: ['vegetarian'],
  },

  // ---------- WRAPS ----------
  {
    id: 'wr-firecracker',
    name: 'Firecracker Wrap',
    category: 'wraps',
    description:
      'Crispy chicken, sriracha slaw, pickled jalapeños, and chipotle mayo in a toasted tortilla.',
    ingredients: [
      'crispy chicken',
      'sriracha slaw',
      'pickled jalapeños',
      'chipotle mayo',
      'tortilla',
    ],
    calories: 590,
    price: 11.5,
    rating: 4.7,
    reviews: 632,
    image:
      'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=900',
    tags: ['spicy'],
    featured: true,
    popular: true,
  },
  {
    id: 'wr-mediterranean',
    name: 'Mediterranean Wrap',
    category: 'wraps',
    description:
      'Falafel, hummus, roasted red pepper, cucumber, and tahini in a spinach wrap.',
    ingredients: [
      'falafel',
      'hummus',
      'roasted red pepper',
      'cucumber',
      'tahini',
      'spinach wrap',
    ],
    calories: 480,
    price: 10.5,
    rating: 4.6,
    reviews: 388,
    image:
      'https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg?auto=compress&cs=tinysrgb&w=900',
    tags: ['vegetarian', 'vegan'],
  },
  {
    id: 'wr-buffalo',
    name: 'Buffalo Chicken Wrap',
    category: 'wraps',
    description:
      'Grilled chicken, buffalo sauce, blue cheese crumble, romaine, and tomato.',
    ingredients: [
      'grilled chicken',
      'buffalo sauce',
      'blue cheese',
      'romaine',
      'tomato',
    ],
    calories: 560,
    price: 11.0,
    rating: 4.5,
    reviews: 295,
    image:
      'https://gimmedelicious.com/wp-content/uploads/2018/02/Buffalo-Chicken-Wraps-3.jpg',
    tags: ['spicy'],
  },

  // ---------- APPETIZERS ----------
  {
    id: 'ap-wings',
    name: 'Korean BBQ Wings',
    category: 'appetizers',
    description:
      'Double-fried wings tossed in a sticky gochujang glaze with sesame and scallion.',
    ingredients: [
      'chicken wings',
      'gochujang glaze',
      'sesame',
      'scallion',
      'ginger',
    ],
    calories: 420,
    price: 9.5,
    rating: 4.8,
    reviews: 870,
    image:
      'https://media-cdn2.greatbritishchefs.com/media/44jl5cby/gbc_wings-12.whqc_768x512q90.jpg',
    tags: ['spicy'],
    featured: true,
    popular: true,
  },
  {
    id: 'ap-truffle-fries',
    name: 'Truffle Parmesan Fries',
    category: 'appetizers',
    description:
      'Hand-cut fries, truffle oil, shaved Parmigiano, and chives with garlic aioli.',
    ingredients: [
      'russet potatoes',
      'truffle oil',
      'Parmigiano',
      'chives',
      'garlic aioli',
    ],
    calories: 380,
    price: 7.5,
    rating: 4.7,
    reviews: 1020,
    image:
      'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=900',
    tags: ['vegetarian'],
    popular: true,
  },
  {
    id: 'ap-bruschetta',
    name: 'Heirloom Bruschetta',
    category: 'appetizers',
    description:
      'Toasted sourdough, heirloom tomato, basil oil, and a balsamic reduction.',
    ingredients: [
      'sourdough',
      'heirloom tomato',
      'basil oil',
      'balsamic reduction',
      'garlic',
    ],
    calories: 240,
    price: 6.5,
    rating: 4.5,
    reviews: 233,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2CAFGVNpYLCouOwMSLQOmDl96MitdhCXSGNNJUCUwxUFURl1yihCfDR4&s=10',
    tags: ['vegetarian', 'vegan'],
  },
  {
    id: 'ap-mozzarella',
    name: 'Burrata & Crostini',
    category: 'appetizers',
    description:
      'Creamy burrata, blistered cherry tomatoes, pesto, and toasted crostini.',
    ingredients: [
      'burrata',
      'cherry tomatoes',
      'pesto',
      'crostini',
      'olive oil',
    ],
    calories: 360,
    price: 11.0,
    rating: 4.8,
    reviews: 412,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSagUUpj6bmNPClGDoHy5lMSkU057eGE44d_4UwU1DEzzhQmLrEd5gRVnk&s=10',
    tags: ['vegetarian'],
  },

  // ---------- DESSERTS ----------
  {
    id: 'ds-lava',
    name: 'Molten Chocolate Lava Cake',
    category: 'desserts',
    description:
      'Warm dark-chocolate cake with a flowing center, vanilla bean gelato, and raspberry coulis.',
    ingredients: [
      'dark chocolate',
      'butter',
      'eggs',
      'vanilla gelato',
      'raspberry coulis',
    ],
    calories: 540,
    price: 8.5,
    rating: 4.9,
    reviews: 1560,
    image:
      'https://images.pexels.com/photos/45202/brownie-dessert-cake-sweet-45202.jpeg?auto=compress&cs=tinysrgb&w=900',
    tags: ['vegetarian'],
    featured: true,
    popular: true,
  },
  {
    id: 'ds-tiramisu',
    name: 'Classic Tiramisu',
    category: 'desserts',
    description:
      'Espresso-soaked ladyfingers, mascarpone cream, and a dusting of cocoa.',
    ingredients: [
      'ladyfingers',
      'mascarpone',
      'espresso',
      'cocoa',
      'marsala',
    ],
    calories: 460,
    price: 7.5,
    rating: 4.8,
    reviews: 890,
    image:
      'https://images.pexels.com/photos/6880219/pexels-photo-6880219.jpeg?auto=compress&cs=tinysrgb&w=900',
    tags: ['vegetarian'],
  },
  {
    id: 'ds-cheesecake',
    name: 'Burnt Basque Cheesecake',
    category: 'desserts',
    description:
      'Caramelized top, silky cream cheese center, and a hint of sea salt.',
    ingredients: [
      'cream cheese',
      'cream',
      'eggs',
      'sugar',
      'sea salt',
    ],
    calories: 480,
    price: 7.0,
    rating: 4.7,
    reviews: 540,
    image:
      'https://images.pexels.com/photos/4040692/pexels-photo-4040692.jpeg?auto=compress&cs=tinysrgb&w=900',
    tags: ['vegetarian'],
  },

  // ---------- DRINKS ----------
  {
    id: 'dr-shake',
    name: 'Salted Caramel Milkshake',
    category: 'drinks',
    description:
      'Van bean ice cream, house caramel, flaky salt, and a chocolate rim.',
    ingredients: [
      'vanilla ice cream',
      'house caramel',
      'milk',
      'sea salt',
      'chocolate',
    ],
    calories: 520,
    price: 6.5,
    rating: 4.8,
    reviews: 720,
    image:
      'https://www.amytreasure.com/wp-content/uploads/2019/07/2K3A4574-735x1103.jpg',
    tags: ['vegetarian'],
    featured: true,
    popular: true,
  },
  {
    id: 'dr-lemonade',
    name: 'Ginger Mint Lemonade',
    category: 'drinks',
    description:
      'Cold-pressed lemon, fresh ginger, mint, and a touch of cane sugar.',
    ingredients: ['lemon', 'ginger', 'mint', 'cane sugar', 'sparkling water'],
    calories: 180,
    price: 4.5,
    rating: 4.6,
    reviews: 340,
    image:
      'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=900',
    tags: ['vegetarian', 'vegan', 'gluten-free'],
  },
  {
    id: 'dr-coldbrew',
    name: 'Vanilla Cold Brew',
    category: 'drinks',
    description:
      '18-hour steeped cold brew, Madagascar vanilla, and a creamy oat finish.',
    ingredients: [
      'cold brew coffee',
      'Madagascar vanilla',
      'oat milk',
      'ice',
    ],
    calories: 110,
    price: 5.0,
    rating: 4.7,
    reviews: 460,
    image:
      'https://copykat.com/wp-content/uploads/2021/08/Starbucks-Vanilla-Sweet-Cream-Cold-Brew-Pin-1.jpg',
    tags: ['vegetarian', 'vegan'],
  },
];

export function getMenuById(id: string): MenuItem | undefined {
  return MENU.find((m) => m.id === id);
}

export function getFeatured(): MenuItem[] {
  return MENU.filter((m) => m.featured);
}

export function getByCategory(category: string): MenuItem[] {
  return MENU.filter((m) => m.category === category);
}
