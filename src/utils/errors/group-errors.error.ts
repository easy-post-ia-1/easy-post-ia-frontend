import { Error } from '@models/index';

export function groupErrorMessages(errors: Error[]) {
  return errors.reduce((acc: Record<string, string>, error: Error) => {
    const path = error.path[0].toString();
    if (!acc[path]) {
      acc[path] = '';
    }
    acc[path] += (acc[path] ? '\n' : '') + error.message;
    return acc;
  }, {});
}
