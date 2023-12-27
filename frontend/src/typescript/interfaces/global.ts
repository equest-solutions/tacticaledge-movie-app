import { DetailedHTMLProps, InputHTMLAttributes, MouseEventHandler } from 'react';

// * general types
export type Size = 'sm' | 'md' | 'lg' | 'block';

export interface CustomClassProps {
   className?: string;
   size?: Size;
}

// * route types
export interface Route {
   path: string,
   element: JSX.Element,
   layout?: string
}

// * input types
export interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
   name: string;
   hasError?: boolean;
   icon?: JSX.Element;
   label?: string;
   inputClass?: string;
}

// * icon types
export type IconTypes = 'user' | 'phone' | 'email' | 'password';

export interface IconProps {
   name: IconTypes;
}

// * button types
// following interface will make sure that if isLink is true, linkPath must be provided
interface LinkPresent extends CustomClassProps {
   isLink?: true;
   linkPath: string;
   onClick?: any;
}

interface LinkAbsent extends CustomClassProps {
   isLink?: false | undefined;
   type?: 'button' | 'submit';
   onClick?: Function;
}

export type ButtonClassProps = LinkPresent | LinkAbsent;

// * Movie types

export interface Movie {
   img: string;
   title: string;
   year: string;
}

export interface MovieStore {
   page: number | string;
   list: Movie[];
}