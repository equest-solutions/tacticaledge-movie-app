const pattern = new RegExp(
   /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
 )
export function isValid(input: any, type: string) {

   switch (type) {
      case 'text':
         return typeof input === 'string' && input.trim().length > 0;
      case 'title':
         return typeof input === 'string' && input.trim().length > 0;
      case 'year':
         return typeof input === 'string' && input.trim().length > 0;
      case 'email':
         return typeof input === 'string' && input.trim().length > 0 && pattern.test(input.trim());
      case 'password':
         return typeof input === 'string' && input.trim().length >= 6;
      default:
         return true;
   }
}

export function isInvalid(input: any, type: string) {
   return !isValid(input, type);
}
