import { PropsWithChildren } from 'react';
import { InputProps } from '../typescript/interfaces/global';

function TextInput({ name, icon, ...props }: PropsWithChildren<InputProps>) {
   return <input {...props} className='form-input' name={name} />;
}
export default TextInput;
