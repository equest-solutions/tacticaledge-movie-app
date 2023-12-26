import { FormEvent, useState } from 'react';
import TextInput from '../../components/TextInput';
import { LOGIN_URL, loginFormElements } from '../../helper/config';
import Button from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';
import HeadingLarge from '../../components/typography/HeadingLarge';
import { isValid } from '../../helper/formValidator';

interface FormState {
   email: boolean;
   password: boolean;
   formValid: boolean;
}

const formErrorInitialState: FormState = {
   email: false,
   password: false,
   formValid: true,
};

function Login() {
   const navigate = useNavigate();

   const [formError, setFormError] = useState(formErrorInitialState);

   function inputChangeHandler(key: string, e: FormEvent<HTMLInputElement>) {
      const value = (e.target as HTMLInputElement).value;
      if (isValid(value, key)) {
         setFormError((prev) => {
            return { ...prev, [key]: false };
         });
      }
   }

   function submitHandler(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const data = Object.fromEntries(formData);
      let isFormValid = true;
      setFormError((prev) => {
         return { ...prev, formValid: true };
      });

      Object.keys(data).forEach((key) => {
         const isItemValid = isValid(data[key], key);
         if (!isItemValid) {
            isFormValid = false;
            setFormError((prev) => {
               return { ...prev, formValid: false, [key]: true };
            });
         }
      });

      if (!isFormValid) return;

      if (data.rememberLogin) {
         localStorage.setItem('email', data.email as string);
         localStorage.setItem('password', data.password as string);
      } else {
         localStorage.removeItem('email');
         localStorage.removeItem('password');
      }

      fetch(LOGIN_URL, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            email: data.email,
            password: data.password,
         }),
      })
         .then((res) => {
            return res.json();
         })
         .then((data) => {
            navigate('/movies');
         });
   }

   return (
      <div className="min-h-screen flex items-center justify-center">
         <div className="max-w-[300px] w-11/12">
            <HeadingLarge className="text-center">Sign in</HeadingLarge>
            <div className="mt-8">
               <form onSubmit={submitHandler}>
                  <div className="space-y-6">
                     {loginFormElements.map((item) => (
                        <div key={item.id}>
                           <TextInput
                              defaultValue={localStorage.getItem(item.id) || ''}
                              onChange={(e) => {
                                 if (!formError.formValid) inputChangeHandler(item.id, e);
                              }}
                              hasError={formError[item.id as keyof FormState]}
                              label={item.label}
                              type={item.type}
                              placeholder={item.label}
                              id={item.id}
                              name={item.id}
                           />
                        </div>
                     ))}
                     <div className="space-x-3 flex items-center mx-auto w-fit">
                        <input type="checkbox" name="rememberLogin" id="rememberLogin" className="form-checkbox" />
                        <label className="text-sm" htmlFor="rememberLogin">
                           Remember me
                        </label>
                     </div>
                     <Button size="block">Login</Button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
}
export default Login;
