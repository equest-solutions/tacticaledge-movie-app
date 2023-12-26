import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

// * general types
export type Size = 'sm' | 'md' | 'lg' | 'block';

export interface CustomClassProps {
   className?: string;
   size?: Size;
}

// * input types
export interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
   name: string;
   icon?: JSX.Element;
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
}

interface LinkAbsent extends CustomClassProps {
   isLink?: false | undefined;
}

export type ButtonClassProps = LinkPresent | LinkAbsent;

// * avatar types

export type ImgSize = 'sm' | 'md' | 'lg';

export interface AvatarProps extends CustomClassProps {
   img: string;
   imgSize?: ImgSize;
   title: string;
   titleClass?: string;
   desc?: string;
   descClass?: string;
}