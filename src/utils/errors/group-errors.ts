import { Error, LoginFormErrorValues, UserSignUp } from '@models/index';

// Function overloads to specify the return type for each case
export function groupErrorMessages(errors: Error[], returnType: 'signup'): UserSignUp;
export function groupErrorMessages(errors: Error[], returnType: 'login'): LoginFormErrorValues;
export function groupErrorMessages(errors: Error[], returnType: 'signup' | 'login' = 'login') {
  const errorMessages = errors.reduce(
    (acc: Record<string, string>, error: Error) => {
      const path = error.path[0].toString();
      if (!acc[path]) {
        acc[path] = '';
      }
      acc[path] += (acc[path] ? '\n' : '') + error.message;
      return acc;
    },
    {} as Record<string, string>
  );

  // Return type based on `returnType` argument
  if (returnType === 'signup') {
    return errorMessages as UserSignUp;
  } else {
    return errorMessages as unknown as LoginFormErrorValues;
  }
}
