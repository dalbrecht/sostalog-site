import { collectionsFromConfig } from '@sagegrouse/astro';
import sagegrouseConfig from '../sagegrouse.config';

export const collections = collectionsFromConfig(sagegrouseConfig);
