//*********************  login static data start ********************//
interface FormElement {
   id: string;
   label: string;
   type: string;
   isRequired?: boolean;
   hasError?: boolean;
}

export const loginFormElements: FormElement[] = [
   {
      id: 'email',
      label: 'Email',
      type: 'email',
      isRequired: true,
      hasError: false
   },
   {
      id: 'password',
      label: 'Password',
      type: 'password',
      isRequired: true,
      hasError: false
   },
];
//*********************  login static data end ********************//
