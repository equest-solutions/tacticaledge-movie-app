import { FormEvent } from 'react';
import BGImage from '../../assets/images/bg-signup.jpg';
import TextInput from '../../components/TextInput';
import HeadingMedium from '../../components/typography/HeadingMedium';
import TextLarge from '../../components/typography/TextLarge';
import AuthLayout from '../../layouts/AuthLayout';
import IconForm from '../../components/icon/IconForm';
import { signupFormElements } from '../../helper/authConfig';
import Button from '../../components/button/Button';
import TextPrimary from '../../components/typography/TextPrimary';
import { NavLink } from 'react-router-dom';

function Signup() {
   function submitHandler(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const data = Object.fromEntries(formData);

      console.log(data);
   }

   return (
      <AuthLayout image={BGImage}>
         <div className="max-w-[440px] w-11/12">
            <HeadingMedium className="text-black-100 text-center">
               Get started with <span className="font-bold text-primary-400">SM Restaurant</span>
            </HeadingMedium>
            <TextLarge className="text-gray text-center">Sign up to your profile below</TextLarge>
            <div className="pe-2 ps-5 mt-9">
               <form onSubmit={submitHandler}>
                  <div className="space-y-9">
                     {signupFormElements.map((item) => (
                        <div key={item.id}>
                           <TextInput
                              type={item.type}
                              placeholder={item.label}
                              icon={<IconForm name={item.icon} />}
                              id={item.id}
                              name={item.id}
                           />
                        </div>
                     ))}
                  </div>
                  <div className="space-y-7 mt-12">
                     <div className="flex items-center space-x-5">
                        <input className="form-checkbox" type="checkbox" name="terms" id="terms" required />
                        <label className="text-gray-300 font-medium leading-tight text-lg" htmlFor="terms">
                           I agree to the terms and conditions.
                        </label>
                     </div>
                     <div className="flex items-center space-x-5">
                        <input
                           className="form-checkbox"
                           type="checkbox"
                           name="humanVerification"
                           id="humanVerification"
                           required
                        />
                        <label className="text-gray-300 font-medium leading-tight text-lg" htmlFor="humanVerification">
                           I'm not Robot
                        </label>
                     </div>
                  </div>
                  <Button className="mt-11 bg-primary-400 font-secondary" size="block">
                     Sign Up
                  </Button>
               </form>
               <TextPrimary className="mt-6 text-gray-200 font-secondary text-center">
                  Already have account? <NavLink className='text-primary-400 font-bold link' to="/login">Log In</NavLink>
               </TextPrimary>
            </div>
         </div>
      </AuthLayout>
   );
}
export default Signup;
