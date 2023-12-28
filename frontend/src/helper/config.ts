export const loginFormElements = [
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

export const RES_PER_PAGE = 8;


//*********************  API URL data start ********************//
const BASE_URL = import.meta.env.VITE_BASE_URL;
export const AWS_URL = import.meta.env.VITE_AWS_URL;

export const LOGIN_URL = BASE_URL + 'api/login';
export const CREATE_MOVIE_URL = BASE_URL + 'api/create-movie';
export const EDIT_MOVIE_URL = BASE_URL + 'api/update-movie/';
export const GET_MOVIE_LIST_URL = BASE_URL + 'api/get-movies';
export const GET_MOVIE_DETAILS_URL = BASE_URL + 'api/get-movie-details?=';

// 'http://localhost:81/api/get-movie-details?=dc7c1cc8-a8b0-40ed-857d-9590d27f0e6d'
//*********************  API URL data end ********************//

