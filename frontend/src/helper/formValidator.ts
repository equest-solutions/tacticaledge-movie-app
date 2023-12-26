export function isValid(input: any, type: string) {

   switch (type) {
      case 'text':
         return typeof input === 'string' && input.trim().length > 0;
      case 'title':
         return typeof input === 'string' && input.trim().length > 0;
      case 'year':
         return typeof input === 'string' && input.trim().length > 0;
      case 'email':
         return typeof input === 'string' && input.trim().length > 0 && input.includes('@');
      case 'password':
         return typeof input === 'string' && input.trim().length >= 6;
      default:
         return true;
   }
}

export function isInvalid(input: any, type: string) {
   return !isValid(input, type);
}
