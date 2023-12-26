//*********************  login static data start ********************//
interface FormElement {
   id: string;
   label: string;
   type: string;
}

export const loginFormElements: FormElement[] = [
   {
      id: 'email',
      label: 'Email',
      type: 'email',
   },
   {
      id: 'password',
      label: 'Password',
      type: 'password',
   },
];
//*********************  login static data end ********************//

//*********************  Movie Form static data start ********************//
export const movieFormElements: FormElement[] = [
   {
      id: 'title',
      label: 'Title',
      type: 'text',
   },
   {
      id: 'year',
      label: 'Publishing year',
      type: 'number',
   },
];
//*********************  Movie Form static data end ********************//
