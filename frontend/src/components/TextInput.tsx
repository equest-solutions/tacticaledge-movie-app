import { PropsWithChildren } from 'react';
import { InputProps } from '../typescript/interfaces/global';

function TextInput({ name,inputClass, icon, label,className, hasError, ...props }: PropsWithChildren<InputProps>) {
   return (
      <div className={`form-control ${className} ${hasError && 'has-error'}`}>
         <input {...props} className={`${inputClass ? inputClass : ''} form-input`} id={name} name={name} />
         {hasError && <p className='form-error'>Please enter valid {label}</p>}
      </div>
   );
}
export default TextInput;
