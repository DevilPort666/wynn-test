// components/registry.ts
import Hero from './Hero';
import Promo from './Promo';

export const componentMap = {
    hero: Hero,
    promo: Promo,
} as const;