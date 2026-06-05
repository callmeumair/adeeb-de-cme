import { Product } from '@/types';
export const mockProducts: Partial<Product>[] = [
  { id: '1', name: 'Royal Oud Intense', slug: 'royal-oud-intense', price: 4999, originalPrice: 6999, category: 'Oud', badge: 'BESTSELLER', images: [], topNotes: ['Saffron', 'Bergamot'], heartNotes: ['Oud', 'Rose'], baseNotes: ['Musk', 'Amber'] },
  { id: '2', name: 'Midnight Musk Elixir', slug: 'midnight-musk-elixir', price: 3499, originalPrice: null, category: 'Musk', badge: 'NEW', images: [], topNotes: ['Black Pepper'], heartNotes: ['Musk'], baseNotes: ['Vanilla'] },
  { id: '3', name: 'Rose de Arabia', slug: 'rose-de-arabia', price: 5499, originalPrice: 7499, category: 'Rose', badge: 'SALE', images: [], topNotes: ['Rose'], heartNotes: ['Oud'], baseNotes: ['Sandalwood'] },
  { id: '4', name: 'Amber Noir', slug: 'amber-noir', price: 4299, originalPrice: null, category: 'Woody', badge: null, images: [], topNotes: ['Amber'], heartNotes: ['Patchouli'], baseNotes: ['Cedar'] },
  { id: '5', name: 'Sultan\'s Oud', slug: 'sultans-oud', price: 7999, originalPrice: 9999, category: 'Oud', badge: 'LIMITED', images: [], topNotes: ['Cardamom'], heartNotes: ['Oud'], baseNotes: ['Leather'] },
  { id: '6', name: 'Velvet Rose', slug: 'velvet-rose', price: 3999, originalPrice: null, category: 'Rose', badge: null, images: [], topNotes: ['Pink Pepper'], heartNotes: ['Rose'], baseNotes: ['Patchouli'] },
  { id: '7', name: 'Dark Saffron', slug: 'dark-saffron', price: 5999, originalPrice: null, category: 'Oriental', badge: 'NEW', images: [], topNotes: ['Saffron'], heartNotes: ['Leather'], baseNotes: ['Vetiver'] },
  { id: '8', name: 'White Musk Premium', slug: 'white-musk-premium', price: 2999, originalPrice: 3999, category: 'Musk', badge: null, images: [], topNotes: ['Aldehydes'], heartNotes: ['Musk'], baseNotes: ['Amber'] },
];
