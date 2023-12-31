import createMiddleware from 'next-intl/middleware';
import {locales, localePrefix, pathnames} from './navigation';
 
export default createMiddleware({
  defaultLocale: 'en',
  localePrefix,
  locales,
  pathnames
});

export const config = {
    // Match only internationalized pathnames
    matcher: ['/', '/(sk|en|cz|de|fr|es|ua|pl|hu)/:path*']
  };