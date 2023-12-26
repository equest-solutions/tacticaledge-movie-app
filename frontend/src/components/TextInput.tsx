import { PropsWithChildren } from 'react';
import { InputProps } from '../typescript/interfaces/global';

function TextInput({ name, icon, label, hasError, ...props }: PropsWithChildren<InputProps>) {
   return (
      <div className={`form-control ${hasError && 'has-error'}`}>
         <input {...props} className="form-input" id={name} name={name} />
         {hasError && <p className='form-error'>Please enter valid {label}</p>}
      </div>
   );
}
export default TextInput;
