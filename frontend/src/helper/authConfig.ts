import { IconTypes } from '../typescript/interfaces/global';

//*********************  sign up static data start ********************//
interface FormElement {
   id: string;
   label: string;
   icon: IconTypes;
   type: string;
}

export const signupFormElements: FormElement[] = [
   {
      id: 'firstName',
      label: 'First Name',
      icon: 'user',
      type: 'text',
   },
   {
      id: 'lastName',
      label: 'Last Name',
      icon: 'user',
      type: 'text',
   },
   {
      id: 'phoneNumber',
      label: 'Phone Number',
      icon: 'phone',
      type: 'number',
   },
   {
      id: 'email',
      label: 'Email',
      icon: 'email',
      type: 'email',
   },
   {
      id: 'pwd',
      label: 'Password',
      icon: 'password',
      type: 'password',
   },
   {
      id: 'cnfpwd',
      label: 'Confirm Password',
      icon: 'password',
      type: 'password',
   },
];

export const loginFormElements: FormElement[] = [
   {
      id: 'email',
      label: 'Email',
      icon: 'email',
      type: 'email',
   },
   {
      id: 'pwd',
      label: 'Password',
      icon: 'password',
      type: 'password',
   },
]
//*********************  sign up static data end ********************//
