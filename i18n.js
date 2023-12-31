import {getRequestConfig} from 'next-intl/server';
 
// Can be imported from a shared config
export const locales = ['en', 'sk', 'cz', 'de', 'fr', 'es', 'ua', 'pl', 'hu'];
 
export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) notFound();
 
  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
