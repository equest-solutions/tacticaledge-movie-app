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

//*********************  Movie static data start ********************//
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

export const RES_PER_PAGE = 8;
//*********************  Movie static data end ********************//


//*********************  API URL data end ********************//
const BASE_URL = 'http://localhost:8000/';
export const AWS_URL = 'https://s3movieapp.s3.amazonaws.com/';

export const LOGIN_URL = BASE_URL + 'api/login';
export const CREATE_MOVIE_URL = BASE_URL + 'api/create-movie';
export const GET_MOVIE_LIST_URL = BASE_URL + 'api/get-movies';
//*********************  API URL data end ********************//

'?limtStart=1&limitEnd=10'

