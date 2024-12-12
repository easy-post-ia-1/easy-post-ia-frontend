import { CountryType } from '@models/zustand.model';

export const countries: readonly CountryType[] = [
  { code: 'CO', label: 'Colombia', phone: '57', lang: 'es' },
  {
    code: 'US',
    label: 'United States',
    phone: '1',
    lang: 'en',
    suggested: true,
  },
];
