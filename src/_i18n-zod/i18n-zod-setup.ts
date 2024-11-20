import { z } from 'zod';
import { makeZodI18nMap } from 'zod-i18n-map';

// these two namespaces need to add to the i18n init config's ns.
z.setErrorMap(makeZodI18nMap({ ns: ['zod', 'custom'] }));
export { z };
