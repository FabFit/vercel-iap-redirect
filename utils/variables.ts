import env from 'env-var';

export const PRODUCTION_REDIRECT = env.get('PRODUCTION_REDIRECT').required().asUrlString();
export const DEVELOPMENT_REDIRECT = env.get('DEVELOPMENT_REDIRECT').required().asUrlString();